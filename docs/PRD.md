# Product Requirements Document (PRD)
# Interactive Numerical Methods Learning System

## 1. Document Information

| Field | Value |
|-------|-------|
| Product Name | Numerical Methods Interactive Learning System |
| Version | 1.0.0 |
| Course | Metode Numerik (ELT60214) |
| Institution | Universitas Negeri Yogyakarta - Teknik Elektro |
| Date | 2025-01-14 |
| Author | Z.ai Development Team |

## 2. Executive Summary

The Interactive Numerical Methods Learning System is a web-based educational platform designed to support the "Metode Numerik" (Numerical Methods) course (ELT60214) for Electrical Engineering students. The system provides interactive learning experiences with embedded Python code execution (via Pyodide), allowing students to explore and implement numerical algorithms without leaving the browser or requiring external tools like Jupyter Notebook or Google Colab.

## 3. Problem Statement

**Current Challenges:**
- Students need to switch between learning materials and coding environments (Jupyter/Colab)
- Difficulty in visualizing numerical algorithms in real-time
- Limited interactivity in traditional lecture materials
- No unified platform for theory explanation, code execution, and visualization
- Barrier to entry for students unfamiliar with Python environment setup

**Target Users:**
- Primary: Electrical Engineering students (Semester 4) taking ELT60214
- Secondary: Instructors teaching Numerical Methods
- Tertiary: Self-learners interested in numerical methods

## 4. Product Goals

### 4.1 Primary Goals
1. **Seamless Learning Experience**: Provide theory, code execution, and visualization in a single interface
2. **No External Dependencies**: Run Python code directly in the browser using Pyodide
3. **Interactive Exploration**: Allow students to modify code parameters and see real-time results
4. **Visual Learning**: Include charts, graphs, and animations for each numerical method
5. **Progress Tracking**: Help students track their learning progress through the course

### 4.2 Secondary Goals
1. Mobile-responsive design for learning on different devices
2. Support for both Indonesian and English languages
3. Exportable code snippets and results
4. Integration with course assessment rubrics

## 5. Functional Requirements

### 5.1 Core Features

#### FR-001: Course Navigation System
- Display course syllabus with 16 weeks of content
- Organize topics into logical modules
- Track completion status for each lesson
- Search functionality across all lessons
- Table of contents for quick navigation

#### FR-002: Interactive Lesson Pages
Each lesson must include:
- Learning objectives (CPMK)
- Theory/concept explanation in Indonesian
- Mathematical formulations with proper notation
- Step-by-step algorithm descriptions
- Real-world engineering applications (Electrical Engineering focus)
- Interactive code examples with Pyodide
- Visualizations (charts, graphs, animations)
- Practice exercises
- Self-assessment quizzes

#### FR-003: Python Code Execution
- Embedded code editor with syntax highlighting
- One-click code execution using Pyodide
- Support for key Python libraries:
  - NumPy (numerical computations)
  - Matplotlib (plotting/visualization)
  - SciPy (scientific computing)
  - Pandas (data manipulation)
- Output display (text, plots, tables)
- Error handling with clear messages
- Code reset functionality
- Code copy/download capability

#### FR-004: Visualization Components
- Line charts for function visualization
- Scatter plots for data points
- Animation of iterative processes (e.g., root-finding iterations)
- 3D surface plots for optimization
- Interactive controls (sliders, buttons) to adjust parameters
- Export plots as images

#### FR-005: Progress Tracking
- Track completed lessons
- Track code execution attempts
- Track quiz scores
- Display overall progress percentage
- Resume from last visited lesson

### 5.2 Topic-Specific Requirements

#### TR-001: Introduction & Error Analysis (Week 1)
- Floating-point representation visualization
- Error types explanation (round-off, truncation)
- Error propagation examples
- Interactive error calculator

#### TR-002: Roots of Equations (Week 2-3)
- Bisection method visualization with animation
- Regula Falsi method with step-by-step display
- Newton-Raphson method convergence visualization
- Secant method comparison
- Interactive function plotting with root-finding animation
- Comparison of convergence rates

#### TR-003: Linear Systems (Week 4-5)
- Gauss Elimination step-by-step visualization
- LU Decomposition demonstration
- Jacobi iteration visualization
- Gauss-Seidel iteration with convergence plot
- Matrix operations display
- Circuit modeling examples (resistor networks)

#### TR-004: Non-Linear Systems (Week 6)
- Jacobian matrix calculation
- Multi-variable root finding
- Power system bus modeling examples

#### TR-005: Optimization (Week 7)
- Golden Section Search visualization
- MPPT (Maximum Power Point Tracking) simulation for PV panels
- One-dimensional optimization animations

#### TR-006: Interpolation (Week 9-10)
- Lagrange polynomial interpolation
- Newton divided difference interpolation
- Cubic spline interpolation visualization
- Comparison of interpolation methods
- Sensor data estimation examples

#### TR-007: Integration (Week 11)
- Trapezoidal rule visualization
- Simpson's rule demonstration
- Error analysis comparison
- Battery charge estimation examples

#### TR-008: Differentiation (Week 12)
- Forward, backward, central difference methods
- Error order visualization (O(h), O(h²))
- Motor encoder speed calculation examples

#### TR-009: ODE Solutions (Week 13)
- Euler method visualization
- Runge-Kutta methods (2nd, 4th order)
- RC circuit transient response simulation
- Stability analysis visualization

#### TR-010: Power Flow Project (Week 14-15)
- Newton-Raphson power flow simulation
- Bus voltage visualization
- Power flow diagram
- Convergence analysis

### 5.3 Assessment Features

#### AF-001: Quizzes
- Multiple choice questions per lesson
- Immediate feedback on answers
- Explanations for correct/incorrect answers
- Score tracking

#### AF-002: Practice Exercises
- Coding exercises with hints
- Auto-check for correct output
- Progressive difficulty levels

#### AF-003: Project Support
- Template code for Team-Based Project (TBP)
- Power flow simulation framework
- Visualization tools for project results

## 6. Non-Functional Requirements

### NFR-001: Performance
- Page load time < 3 seconds
- Code execution response time < 5 seconds (typical)
- Pyodide initialization < 10 seconds
- Smooth animations (60 FPS)

### NFR-002: Usability
- Intuitive navigation (3 clicks to any lesson)
- Clear visual hierarchy
- Consistent design language
- Keyboard shortcuts for code execution
- Mobile-responsive (viewport 320px+)

### NFR-003: Reliability
- 99.5% uptime
- Graceful error handling
- Auto-save of code edits
- Recovery from failed code execution

### NFR-004: Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- High contrast mode option

### NFR-005: Security
- No server-side code execution (client-side only)
- Sanitized user inputs
- No persistent user data storage required

### NFR-006: Compatibility
- Modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- WebAssembly support required
- No plugin dependencies

## 7. User Stories

### US-001: Student Learning Root-Finding
> "As a student, I want to see an animation of the bisection method converging to a root, so I can understand how the algorithm works visually."

**Acceptance Criteria:**
- Animation shows interval narrowing
- Current interval highlighted
- Iteration count displayed
- Function value at each iteration shown

### US-002: Student Modifying Code
> "As a student, I want to modify the Python code for Newton-Raphson method and directly see the results, so I can experiment with different functions and initial guesses."

**Acceptance Criteria:**
- Code editor with syntax highlighting
- Run button executes code immediately
- Output displays below code
- Errors shown clearly with line numbers

### US-003: Instructor Creating Content
> "As an instructor, I want to add new interactive examples for optimization methods, so I can demonstrate MPPT concepts for solar panels."

**Acceptance Criteria:**
- Simple format for adding lessons
- Support for code blocks
- Support for embedded visualizations
- Consistent styling across lessons

### US-004: Student Tracking Progress
> "As a student, I want to see my progress through the course, so I know which lessons I've completed and what's next."

**Acceptance Criteria:**
- Visual progress indicator
- Checkmarks for completed lessons
- Percentage complete
- Next lesson highlighted

## 8. Content Structure

### Module 1: Foundations (Weeks 1-2)
- Introduction to Numerical Methods
- Error Analysis
- Floating-Point Arithmetic

### Module 2: Roots of Equations (Weeks 2-3)
- Closed Methods: Bisection, Regula Falsi
- Open Methods: Newton-Raphson, Secant
- Convergence Analysis

### Module 3: Linear Systems (Weeks 4-5)
- Direct Methods: Gauss, LU Decomposition
- Iterative Methods: Jacobi, Gauss-Seidel
- Circuit Applications

### Module 4: Non-Linear Systems (Week 6)
- Jacobian Matrix
- Multi-Variable Root Finding

### Module 5: Optimization (Week 7)
- One-Dimensional Optimization
- Golden Section Search
- MPPT Applications

### Module 6: Interpolation (Weeks 9-10)
- Polynomial Interpolation
- Spline Interpolation
- Data Estimation

### Module 7: Integration & Differentiation (Weeks 11-12)
- Numerical Integration
- Numerical Differentiation
- Error Analysis

### Module 8: ODE Solutions (Week 13)
- Euler Methods
- Runge-Kutta Methods
- Circuit Transients

### Module 9: Project Application (Weeks 14-16)
- Power Flow Simulation
- Team-Based Project Support

## 9. Success Metrics

### Learning Outcomes
- Student engagement: Code execution rate > 70% per lesson
- Completion rate: > 60% of students complete all lessons
- Quiz performance: Average score > 70%

### Technical Metrics
- Page load time: P95 < 3 seconds
- Code execution success rate: > 95%
- Error rate: < 5% of code executions fail unexpectedly

### User Satisfaction
- User satisfaction score: > 4.0/5.0
- Time to complete lessons: Reduced by 30% vs traditional methods
- Recommendation rate: > 80% would recommend to peers

## 10. Constraints & Assumptions

### Constraints
- Browser must support WebAssembly
- Internet connection required (for Pyodide CDN)
- No server-side Python execution
- No user authentication required (MVP)

### Assumptions
- Students have basic Python knowledge
- Modern browsers available to students
- Stable internet connection for Pyodide loading
- Content available in Indonesian primarily

## 11. Dependencies

### External Libraries
- **Pyodide**: Python runtime in WebAssembly
- **NumPy**: Numerical computations (via Pyodide)
- **Matplotlib**: Plotting (via Pyodide)
- **React/Next.js**: Frontend framework
- **Tailwind CSS**: Styling
- **shadcn/ui**: UI components

### Data Sources
- Course syllabus (ELT60214)
- Chapra & Canale textbook examples
- Instructor-provided examples

## 12. Risks & Mitigations

### Risk 1: Pyodide Performance
**Risk**: Large code execution may be slow
**Mitigation**: Optimize code examples, provide loading states, set reasonable timeouts

### Risk 2: Browser Compatibility
**Risk**: Some browsers may not support WebAssembly
**Mitigation**: Provide browser compatibility check, fallback to static content

### Risk 3: Content Management
**Risk**: Hard to update content dynamically
**Mitigation**: Use content in TypeScript/JSON files for easy updates (MVP), future CMS integration

## 13. Future Enhancements (Post-MVP)

- User authentication and progress persistence
- Instructor dashboard for analytics
- Collaborative coding features
- Assignment submission system
- Integration with LMS (Learning Management System)
- Mobile app version
- Offline capability with service workers
- Video explanations
- AI-powered hints and feedback

## 14. Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | [TBD] | | |
| Tech Lead | [TBD] | | |
| Course Instructor | Dr.Eng. Ir. Aji Ery Burhandenny | | |
| Developer | Z.ai | | |

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-01-14 | Z.ai | Initial PRD creation |
