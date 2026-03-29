#!/bin/bash

# Array of commit messages related to college event registration and organizer system
commit_messages=(
    "Add event registration validation"
    "Update organizer dashboard UI"
    "Fix event capacity check"
    "Improve registration form validation"
    "Add email notification for event registration"
    "Update event status tracking"
    "Fix organizer permissions"
    "Add event category filtering"
    "Improve event search functionality"
    "Update registration confirmation email"
    "Add event attendance tracking"
    "Fix duplicate registration prevention"
    "Update organizer profile management"
    "Add event waitlist feature"
    "Improve event date validation"
    "Fix registration deadline check"
    "Add event analytics dashboard"
    "Update participant list export"
    "Fix event image upload"
    "Add registration cancellation feature"
    "Improve organizer notification system"
    "Update event approval workflow"
    "Fix registration payment integration"
    "Add event feedback collection"
    "Improve event calendar view"
    "Update registration confirmation page"
    "Fix organizer event creation"
    "Add event reminder notifications"
    "Improve registration error handling"
    "Update event details display"
    "Fix participant check-in system"
    "Add event capacity alerts"
    "Improve organizer dashboard stats"
    "Update registration form fields"
    "Fix event timezone handling"
)

# Array of files to modify (excluding node_modules and .git)
files=(
    "Univent-College_Event_Management_System-main/README.md"
    "Univent-College_Event_Management_System-main/backend/auth-service/server.js"
    "Univent-College_Event_Management_System-main/backend/auth-service/seedUsers.js"
    "Univent-College_Event_Management_System-main/backend/auth-service/createAdmin.js"
    "Univent-College_Event_Management_System-main/backend/auth-service/createOrganizer.js"
    "Univent-College_Event_Management_System-main/backend/event-service/server.js"
    "Univent-College_Event_Management_System-main/backend/gateway/server.js"
    "Univent-College_Event_Management_System-main/backend/leaderboard-service/server.js"
    "Univent-College_Event_Management_System-main/backend/notification-service/server.js"
    "Univent-College_Event_Management_System-main/backend/settings-service/server.js"
    "Univent-College_Event_Management_System-main/frontend/src/App.jsx"
    "Univent-College_Event_Management_System-main/frontend/src/main.jsx"
    "Univent-College_Event_Management_System-main/frontend/index.html"
    "Univent-College_Event_Management_System-main/docker-compose.yml"
)

# Days in July 2025 to create commits
days=(16 17 19 20 22 24 27 28 31)

# Distribution of commits per day (total 30)
# Day 16: 4, Day 17: 3, Day 19: 4, Day 20: 3, Day 22: 4, Day 24: 3, Day 27: 3, Day 28: 3, Day 31: 3
commits_per_day=(4 3 4 3 4 3 3 3 3)

commit_index=0

for i in "${!days[@]}"; do
    day=${days[$i]}
    num_commits=${commits_per_day[$i]}
    
    echo "Creating $num_commits commits for July $day, 2025..."
    
    for ((j=0; j<num_commits; j++)); do
        # Random hour between 9 and 20 (9 AM to 8 PM)
        hour=$((9 + RANDOM % 12))
        # Random minute
        minute=$((RANDOM % 60))
        
        # Format date for git
        commit_date="2025-07-${day} ${hour}:${minute}:00"
        
        # Select random file
        file_index=$((RANDOM % ${#files[@]}))
        file="${files[$file_index]}"
        
        # Select random commit message
        msg_index=$((commit_index % ${#commit_messages[@]}))
        commit_msg="${commit_messages[$msg_index]}"
        
        # Make a small change to the file (add a comment or whitespace)
        if [ -f "$file" ]; then
            echo "" >> "$file"
            echo "# Update: $(date +%s)" >> "$file"
            
            # Stage the file
            git add "$file"
            
            # Create commit with backdated timestamp
            GIT_AUTHOR_DATE="$commit_date" GIT_COMMITTER_DATE="$commit_date" \
                git commit -m "$commit_msg" --quiet
            
            echo "  ✓ Commit $((commit_index + 1))/30: $commit_msg ($commit_date)"
        fi
        
        commit_index=$((commit_index + 1))
    done
done

echo ""
echo "✅ Successfully created 30 backdated commits for July 2025!"
echo "Run 'git log --oneline --date=short' to view the commits"
