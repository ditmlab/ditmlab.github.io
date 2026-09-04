# English Featured Publications Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the English publications page show featured publications first and support the same include/exclude toggle as the Korean page.

**Architecture:** Reuse the existing `featured` classification in `_data/publications.yml`. Update `en/publications.html` to split featured and regular publications, put UTD24-marked featured work first while preserving source order, and render the all-publications list with the existing `data-pub-include-featured` JavaScript/CSS behavior.

**Tech Stack:** Jekyll/Liquid, YAML data, vanilla JavaScript, Ruby Bundler.

---

### Task 1: Add a failing regression check

**Files:**
- Create: `/tmp/test_english_featured_publications.rb`
- Test: `en/publications.html`, `_data/publications.yml`

**Step 1: Write the failing test**

Assert that the English template contains a featured-publications section, an ordered featured collection, an all-publications container with the existing toggle hook, and per-item featured markers. Also assert that the source data contains at least one `featured: true` record.

**Step 2: Run the test to verify it fails**

Run: `ruby /tmp/test_english_featured_publications.rb`

Expected: FAIL because the current English template only loops by year and has none of the featured/toggle hooks.

### Task 2: Implement English featured ordering

**Files:**
- Modify: `en/publications.html:11-12`

**Step 1: Write minimal implementation**

Add English-language featured and all-publications sections. Classify each record using the existing explicit `featured` flag and fallback note logic, order UTD24 featured records before other featured records, and keep year-descending order for the all-publications list. Add `data-is-featured` and `data-pub-include-featured` hooks so the existing CSS/JavaScript can hide or show featured records.

**Step 2: Run the regression check**

Run: `ruby /tmp/test_english_featured_publications.rb`

Expected: PASS.

### Task 3: Verify rendered output and site integrity

**Files:**
- Verify: `en/publications.html`, `_data/publications.yml`

**Step 1: Run validation**

Run: `bundle check && bundle exec jekyll build --future --destination <temporary-directory>`.

Expected: dependency check passes, Jekyll build completes, and the generated English page contains `Featured Publications` before `All Publications`.

**Step 2: Check repository safety**

Run: `git diff --check` and inspect `git status` to confirm the pre-existing `_data/members.yml` edit remains untouched.

**Step 3: Commit the implementation**

Commit only the English template change and the design/verification artifacts that belong to this task; do not stage the unrelated `_data/members.yml` edit.
