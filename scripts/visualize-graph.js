#!/usr/bin/env node

/**
 * visualize-graph.js
 *
 * Converts dependency-graph JSON to an interactive D3.js force-directed graph.
 *
 * Usage:
 *   node scripts/dependency-graph.js --json | node scripts/visualize-graph.js
 *   node scripts/visualize-graph.js < /path/to/graph.json
 *
 * Output: A self-contained HTML file written to stdout.
 * Open the HTML in a web browser to interact with the graph:
 * - Drag nodes to rearrange
 * - Zoom/pan with scroll and click-drag
 * - Hover over nodes to highlight connected skills
 * - Click a node to pin/unpin it
 */

const fs = require('fs')
let inputData = ''

// Read JSON from stdin
process.stdin.on('data', chunk => {
  inputData += chunk
})

process.stdin.on('end', () => {
  try {
    const graph = JSON.parse(inputData)
    const html = generateHTML(graph)
    process.stdout.write(html)
  } catch (err) {
    console.error('Error parsing JSON:', err.message)
    process.exit(1)
  }
})

function generateHTML(graph) {
  // Convert adjacency list to nodes and links
  const nodeMap = new Map()
  const links = []

  // Collect all unique nodes
  for (const [source, targets] of Object.entries(graph)) {
    if (!nodeMap.has(source)) {
      nodeMap.set(source, {
        id: source,
        inDegree: 0,
        outDegree: targets.length,
      })
    } else {
      nodeMap.get(source).outDegree += targets.length
    }

    for (const target of targets) {
      if (!nodeMap.has(target)) {
        nodeMap.set(target, {
          id: target,
          inDegree: 1,
          outDegree: 0,
        })
      } else {
        nodeMap.get(target).inDegree += 1
      }

      links.push({
        source: source,
        target: target,
      })
    }
  }

  const nodes = Array.from(nodeMap.values())

  // Calculate node sizes based on degree centrality
  const maxDegree = Math.max(...nodes.map(n => n.inDegree + n.outDegree))
  nodes.forEach(n => {
    n.degree = n.inDegree + n.outDegree
    n.radius = 5 + (n.degree / maxDegree) * 20
  })

  const nodesJSON = JSON.stringify(nodes)
  const linksJSON = JSON.stringify(links)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Skill Dependency Graph</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: #f5f5f5;
      overflow: hidden;
    }

    #container {
      width: 100vw;
      height: 100vh;
      background: #ffffff;
    }

    svg {
      display: block;
      background: linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%);
    }

    .node {
      cursor: pointer;
      stroke: #fff;
      stroke-width: 2px;
      transition: r 0.2s;
    }

    .node:hover {
      stroke-width: 3px;
      filter: drop-shadow(0 0 8px rgba(0, 100, 200, 0.5));
    }

    .node.highlighted {
      stroke: #ff6b35;
      stroke-width: 3px;
      filter: drop-shadow(0 0 10px rgba(255, 107, 53, 0.8));
    }

    .node.faded {
      opacity: 0.2;
    }

    .link {
      stroke: #d0d0d0;
      stroke-width: 1px;
      pointer-events: none;
      transition: stroke-width 0.2s, stroke 0.2s;
    }

    .link.highlighted {
      stroke: #ff6b35;
      stroke-width: 2px;
      opacity: 0.8;
    }

    .link.faded {
      opacity: 0.1;
    }

    .link-arrow {
      fill: #d0d0d0;
      pointer-events: none;
    }

    .link.highlighted .link-arrow {
      fill: #ff6b35;
    }

    .label {
      font-size: 11px;
      fill: #333;
      text-anchor: middle;
      pointer-events: none;
      user-select: none;
      font-weight: 500;
    }

    .label.highlight {
      fill: #222;
      font-weight: bold;
      font-size: 12px;
    }

    .tooltip {
      position: absolute;
      padding: 8px 12px;
      background: rgba(0, 0, 0, 0.85);
      color: #fff;
      border-radius: 4px;
      font-size: 12px;
      pointer-events: none;
      z-index: 1000;
      max-width: 250px;
      word-wrap: break-word;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
      display: none;
    }

    .controls {
      position: absolute;
      top: 20px;
      left: 20px;
      background: rgba(255, 255, 255, 0.95);
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      font-size: 13px;
      max-width: 280px;
      z-index: 100;
    }

    .controls h2 {
      font-size: 14px;
      margin-bottom: 10px;
      color: #222;
    }

    .controls p {
      margin: 6px 0;
      color: #555;
      line-height: 1.4;
    }

    .controls code {
      background: #f0f0f0;
      padding: 2px 4px;
      border-radius: 2px;
      font-family: 'Monaco', 'Courier New', monospace;
      font-size: 11px;
    }

    .stats {
      position: absolute;
      top: 20px;
      right: 20px;
      background: rgba(255, 255, 255, 0.95);
      padding: 16px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      font-size: 12px;
      z-index: 100;
    }

    .stats h3 {
      margin-bottom: 10px;
      font-size: 13px;
      color: #222;
    }

    .stat-row {
      margin: 6px 0;
      color: #555;
      font-family: 'Monaco', 'Courier New', monospace;
    }
  </style>
</head>
<body>
  <div id="container">
    <svg id="graph"></svg>
    <div class="controls">
      <h2>Skill Graph</h2>
      <p><strong>Drag</strong> nodes to move</p>
      <p><strong>Scroll</strong> to zoom</p>
      <p><strong>Click</strong> a node to pin</p>
      <p><strong>Hover</strong> to highlight connections</p>
      <p style="margin-top: 12px; font-size: 12px; color: #888;">
        Node size = connectivity (larger = more connected)
      </p>
    </div>
    <div class="stats">
      <h3>Graph Stats</h3>
      <div class="stat-row">Nodes: <strong id="node-count">0</strong></div>
      <div class="stat-row">Links: <strong id="link-count">0</strong></div>
      <div class="stat-row">Max degree: <strong id="max-degree">0</strong></div>
    </div>
    <div class="tooltip" id="tooltip"></div>
  </div>

  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script>
    const nodes = ${nodesJSON}
    const links = ${linksJSON}

    // Update stats
    const maxDeg = Math.max(...nodes.map(n => n.degree))
    document.getElementById('node-count').textContent = nodes.length
    document.getElementById('link-count').textContent = links.length
    document.getElementById('max-degree').textContent = maxDeg

    const container = document.getElementById('container')
    const width = container.clientWidth
    const height = container.clientHeight

    const svg = d3.select('#graph')
      .attr('width', width)
      .attr('height', height)

    const g = svg.append('g')

    // Color palette
    const colorScale = d3.scaleOrdinal()
      .domain(['low', 'medium', 'high'])
      .range(['#a8d5ff', '#6bbfff', '#0066cc'])

    function getNodeColor(node) {
      if (node.degree === 0) return '#ccc'
      if (node.degree <= 3) return '#a8d5ff'
      if (node.degree <= 8) return '#6bbfff'
      return '#0066cc'
    }

    // Create force simulation
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links)
        .id(d => d.id)
        .distance(d => 50 + Math.max(d.source.degree, d.target.degree) * 2)
        .strength(0.1))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide(d => d.radius + 2))

    // Draw arrowhead marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('markerWidth', 10)
      .attr('markerHeight', 10)
      .attr('refX', 20)
      .attr('refY', 3)
      .attr('orient', 'auto')
      .append('polygon')
      .attr('points', '0 0, 10 3, 0 6')
      .attr('fill', '#d0d0d0')

    // Draw links
    const link = g.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('marker-end', 'url(#arrowhead)')
      .attr('stroke-dasharray', d => 0)

    // Draw nodes
    const node = g.selectAll('.node')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', d => d.radius)
      .attr('fill', d => getNodeColor(d))
      .call(drag(simulation))
      .on('mouseenter', (event, d) => highlightNode(d, true))
      .on('mouseleave', (event, d) => highlightNode(d, false))

    // Draw labels
    const label = g.selectAll('.label')
      .data(nodes)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('dy', '.3em')
      .text(d => {
        // Truncate long names
        if (d.id.length > 15) return d.id.substring(0, 12) + '...'
        return d.id
      })

    // Update positions on each tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      node
        .attr('cx', d => d.x = Math.max(d.radius, Math.min(width - d.radius, d.x)))
        .attr('cy', d => d.y = Math.max(d.radius, Math.min(height - d.radius, d.y)))

      label
        .attr('x', d => d.x)
        .attr('y', d => d.y)
    })

    // Zoom behavior
    const zoom = d3.zoom()
      .on('zoom', (event) => {
        g.attr('transform', event.transform)
      })

    svg.call(zoom)

    // Drag behavior
    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart()
        d.fx = d.x
        d.fy = d.y
      }

      function dragged(event, d) {
        d.fx = event.x
        d.fy = event.y
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0)
        d.fx = null
        d.fy = null
      }

      return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    }

    // Highlight connected nodes and links
    function highlightNode(node, isHover) {
      if (!isHover) {
        node.classList.remove('highlighted')
        label.classed('highlight', false)
        link.classed('highlighted faded', false)
        node.classed('faded', false)
        showTooltip(null)
        return
      }

      // Find connected nodes (incoming and outgoing)
      const connected = new Set()
      connected.add(node.id)

      // Outgoing edges (node → target)
      links.forEach(l => {
        if (l.source.id === node.id) {
          connected.add(l.target.id)
        }
      })

      // Incoming edges (source → node)
      links.forEach(l => {
        if (l.target.id === node.id) {
          connected.add(l.source.id)
        }
      })

      // Apply highlighting
      node.classList.add('highlighted')
      label.classed('highlight', d => d.id === node.id)

      link.classed('highlighted', l => l.source.id === node.id || l.target.id === node.id)
        .classed('faded', l => l.source.id !== node.id && l.target.id !== node.id)

      g.selectAll('.node')
        .classed('faded', d => !connected.has(d.id))

      // Show tooltip
      showTooltip(node, node.id, node.inDegree, node.outDegree)
    }

    function showTooltip(el, name, inDeg, outDeg) {
      const tooltip = document.getElementById('tooltip')
      if (!el) {
        tooltip.style.display = 'none'
        return
      }

      tooltip.style.display = 'block'
      tooltip.innerHTML = \`
        <strong>\${name}</strong><br>
        In-degree: \${inDeg}<br>
        Out-degree: \${outDeg}<br>
        Total: \${inDeg + outDeg}
      \`
    }

    // Click to pin/unpin
    node.on('click', (event, d) => {
      event.stopPropagation()
      d.fx = d.fx === null ? d.x : null
      d.fy = d.fy === null ? d.y : null
      if (!d.fx) simulation.alphaTarget(0.3).restart()
    })

    // Reset zoom on double-click on background
    svg.on('dblclick', () => {
      svg.transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.translate(0, 0))
    })
  </script>
</body>
</html>
`
}
