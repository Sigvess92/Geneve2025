# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a static travel guide webpage for a group trip, designed to be hosted on GitHub Pages. The website must be:
- Modern looking with contemporary design
- Mobile-responsive and fluid across all devices
- Fast and snappy performance
- Easy to navigate for trip participants

## Architecture

This is a static website project that will use:
- HTML/CSS/JavaScript for the frontend
- GitHub Pages for hosting (requires files in root or docs/ folder)
- Mobile-first responsive design approach
- Optimized assets for fast loading

## Development Commands

Since this is a static site, development can use:
- `python -m http.server 8000` or `python3 -m http.server 8000` - Serve locally for testing
- `npx http-server` - Alternative local server (if Node.js is available)

## Deployment

The site deploys automatically to GitHub Pages when pushed to the main branch. Files should be placed in the root directory or a `docs/` folder depending on GitHub Pages configuration.

## Website Structure

The travel guide webpage consists of three main sections accessible via scrolling or dropdown navigation:

1. **Header**: Fixed header with "Blåtur 2025" title and dropdown menu (top-right)
2. **Image Carousel Section**: Photo gallery of trip destinations with smooth transitions
3. **Schedule Section**: Day-by-day itinerary with fluid horizontal/vertical navigation
4. **Information Section**: General trip details and logistics

## Design Requirements

- Modern typography and visual design
- Mobile-first responsive layout that works fluidly on both mobile and desktop
- Smooth scrolling between sections
- Dropdown navigation menu in header for quick section jumping
- Image carousel with placeholder images (real images to be added later)
- Schedule navigation that adapts to screen size (horizontal on desktop, vertical on mobile)
- Fast loading and snappy interactions

## Technical Implementation

- Pure HTML/CSS/JavaScript (no frameworks for performance)
- CSS Grid/Flexbox for responsive layouts
- Smooth scroll behavior for navigation
- Touch-friendly controls for mobile devices
- Optimized images and assets