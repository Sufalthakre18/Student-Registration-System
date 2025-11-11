# Student Registration System

A fully responsive web-based student registration system built with **Tailwind CSS** that allows users to register, view, edit, and delete student records with persistent data storage.

## 🎯 Project Overview

This project is a comprehensive student management system built with **HTML**, **Tailwind CSS**, and **JavaScript**. It provides an intuitive interface for managing student information including name, student ID, email, contact number, class, and gender.

## Github link [link](https://github.com/Sufalthakre18/Student-Registration-System)

## ✨ Features

### Core Functionality
- ✅ **Add New Students** - Register students with complete validation
- ✅ **View All Students** - Display all registered students in a responsive table
- ✅ **Edit Records** - Update existing student information inline
- ✅ **Delete Records** - Remove student records with confirmation
- ✅ **Persistent Storage** - Data saved in localStorage and persists after page refresh
- ✅ **Duplicate Prevention** - Prevents registration of duplicate Student IDs

### Validation Features
- ✅ Student Name: Only accepts letters and spaces
- ✅ Student ID: Only accepts numbers
- ✅ Email: Valid email format validation
- ✅ Contact Number: 10-15 digits only
- ✅ All fields required - Cannot add empty records
- ✅ Real-time validation feedback with error messages

### Design Features
- ✅ **Fully Responsive** - Optimized for Mobile (≤640px), Tablet (641px-1024px), and Desktop (≥1025px)
- ✅ **Modern UI** - Tailwind CSS with gradient backgrounds, smooth transitions
- ✅ **Dynamic Scrollbar** - Automatically added via JavaScript when more than 5 records exist
- ✅ **Accessible** - Semantic HTML tags and proper structure



## 💻 Usage Guide

### Registering a New Student

1. Open `index.html` in your browser
2. Fill in all required fields:
   - **Name**: Letters and spaces only
   - **Student ID**: Numbers only (must be unique)
   - **Email**: Valid email format (example@domain.com)
   - **Contact**: 10-15 digit phone number
   - **Class**: Select from dropdown (11th or 12th)
   - **Gender**: Select from radio buttons (Male/Female/Other)
3. Click "Register Student"
4. Success message confirms registration
5. Form automatically resets for next entry

### Viewing Students

1. Click "View Students" button on the home page, or
2. Open `students.html` directly
3. All registered students appear in a responsive table
4. Table automatically adds vertical scrollbar when more than 5 students

### Editing Student Records

1. Click "Edit" button next to any student
2. Input fields appear for editing
3. Modify the information (Student ID cannot be changed)
4. Click "Save" to confirm changes or "Cancel" to discard
5. All validation rules apply to edited data

### Deleting Student Records

1. Click "Delete" button next to any student
2. Confirm deletion in the popup dialog
3. Record is permanently removed from localStorage
4. Table updates automatically

## 🎨 Responsive Breakpoints

| Device | Screen Size | Optimizations |
|--------|-------------|---------------|
| **Mobile** | ≤ 640px | Single column layout, full-width buttons, stacked elements |
| **Tablet** | 641px - 1024px | Medium-sized elements, optimized spacing |
| **Desktop** | ≥ 1025px | Maximum width containers, spacious multi-column layout |

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Semantic markup structure
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript (ES6)** - DOM manipulation, validation, localStorage API


### Data Storage
- Uses **localStorage** API for persistent storage
- Data structure: Array of student objects in JSON format
- Storage key: `'students'`
- Data persists across page refreshes and browser sessions


## 👨‍💻 Developer Information

**Name**: SUFAL THAKRE 
**Course**: FULLSTACK DEVLOPEMENT WITH AI 
**Institution**: INTERNSHALA  
**Submission Date**: 11 November 2025

**Project Status**: ✅ Complete and Ready for Submission


For questions or issues, contact: [sufalthakre4@gmail.com]
