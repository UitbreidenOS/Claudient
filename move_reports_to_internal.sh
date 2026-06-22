#!/bin/bash

# move_reports_to_internal.sh
# Organizes reports into .internal/ subdirectories by category

REPO_ROOT="/Users/tushar/Desktop/Claudient"
INTERNAL_DIR="$REPO_ROOT/.internal"
MOVED_COUNT=0

# Create .internal/ subdirectories
mkdir -p "$INTERNAL_DIR/audit"
mkdir -p "$INTERNAL_DIR/business"
mkdir -p "$INTERNAL_DIR/reports"
mkdir -p "$INTERNAL_DIR/analytics"
mkdir -p "$INTERNAL_DIR/roadmaps"

# Function to move file and track success
move_file() {
    local src="$1"
    local dest_dir="$2"

    if [ -f "$src" ]; then
        mv "$src" "$dest_dir/" && ((MOVED_COUNT++))
    fi
}

# Move audit reports to .internal/audit/
move_file "$REPO_ROOT/audit_final.py" "$INTERNAL_DIR/audit"
move_file "$REPO_ROOT/audit_search.sh" "$INTERNAL_DIR/audit"
move_file "$REPO_ROOT/audit_search2.py" "$INTERNAL_DIR/audit"
move_file "$REPO_ROOT/audit_search3.py" "$INTERNAL_DIR/audit"
move_file "$REPO_ROOT/audit_search4.py" "$INTERNAL_DIR/audit"
move_file "$REPO_ROOT/audit_search5.py" "$INTERNAL_DIR/audit"
move_file "$REPO_ROOT/claudient-audit-report.md" "$INTERNAL_DIR/audit"
move_file "$REPO_ROOT/skill-audit-results.json" "$INTERNAL_DIR/audit"

# Move business/strategy to .internal/business/
move_file "$REPO_ROOT/feature-inventory.txt" "$INTERNAL_DIR/business"
move_file "$REPO_ROOT/feature-presence.txt" "$INTERNAL_DIR/business"

# Move cleanup/maintenance scripts to .internal/business/
move_file "$REPO_ROOT/cleanup_presence.py" "$INTERNAL_DIR/business"
move_file "$REPO_ROOT/cleanup_presence_v2.py" "$INTERNAL_DIR/business"
move_file "$REPO_ROOT/fix_missing.py" "$INTERNAL_DIR/business"
move_file "$REPO_ROOT/fix_missing_v2.py" "$INTERNAL_DIR/business"
move_file "$REPO_ROOT/fix_specific.py" "$INTERNAL_DIR/business"

# Move executive reports to .internal/reports/
move_file "$REPO_ROOT/showcase-audit-report.md" "$INTERNAL_DIR/reports"

# Verify all files were moved
echo "Moved $MOVED_COUNT files to .internal/"

# List contents of .internal/ for verification
echo ""
echo "Contents of .internal/:"
find "$INTERNAL_DIR" -type f | sort | sed 's|'"$INTERNAL_DIR"'/|  |'
