# MVP (Minimum Viable Product) Scope
# Interactive Numerical Methods Learning System

## 1. Document Information

| Field | Value |
|-------|-------|
| Product Name | Numerical Methods Interactive Learning System |
| MVP Version | 1.0.0 |
| Course | Metode Numerik (ELT60214) |
| Target Release | Q1 2025 |
| Date | 2025-01-14 |
| Author | Z.ai Development Team |

## 2. MVP Vision

The MVP provides a fully functional interactive learning platform for the Numerical Methods course with core features that enable students to learn, experiment with, and visualize numerical algorithms entirely within the browser using Pyodide.

## 3. MVP Objectives

### Primary Objectives
1. Deliver working interactive lessons for all 9 course modules
2. Enable Python code execution directly in the browser
3. Provide visualizations for key numerical methods
4. Support course syllabus structure (16 weeks)
5. Demonstrate real value to students and instructors

### Success Criteria
- All 9 modules functional with interactive examples
- Pyodide integration working smoothly
- Students can complete entire course using the platform
- Positive feedback from pilot testing

## 4. In-Scope Features (MVP)

### 4.1 Must-Have Features (P0)

#### MVP-001: Landing Page & Navigation
**Description**: Home page with course overview and navigation to all modules

**Requirements**:
- Course title and description
- Instructor information
- Module list with expandable sections
- Progress bar showing completion
- Responsive design for mobile/desktop

**Acceptance Criteria**:
- User can navigate to any module in < 3 clicks
- Progress updates when lessons are completed
- Page loads in < 3 seconds

---

#### MVP-002: Pyodide Integration & Code Execution
**Description**: Browser-based Python execution environment

**Requirements**:
- Load Pyodide from CDN
- Initialize Python runtime
- Execute Python code in sandbox
- Capture stdout/stderr output
- Display Matplotlib plots
- Handle errors gracefully
- Support NumPy, Matplotlib, SciPy

**Acceptance Criteria**:
- Code executes within 5 seconds (typical)
- Plots render correctly
- Error messages are clear and helpful
- No server-side execution required

---

#### MVP-003: Interactive Code Editor
**Description**: Code editor component with syntax highlighting

**Requirements**:
- Syntax highlighting for Python
- Line numbers
- Run button
- Reset button
- Copy code button
- Error display with line highlighting

**Acceptance Criteria**:
- Syntax highlighting works correctly
- Run button executes code
- Reset restores original code
- Copy puts code in clipboard

---

#### MVP-004: Visualization Components
**Description**: Charts and graphs for numerical methods

**Requirements**:
- Line charts (function plots)
- Scatter plots (data points)
- Bar charts (comparison data)
- Interactive legends
- Export as PNG
- Responsive sizing

**Acceptance Criteria**:
- Plots render correctly from Matplotlib
- Can be exported as images
- Responsive to window size
- Clear labels and titles

---

#### MVP-005: Module 1 - Introduction & Error Analysis
**Description**: Foundations of numerical methods

**Content**:
- Lesson 1.1: Introduction to Numerical Methods
  - What is numerical methods?
  - Why study numerical methods?
  - Applications in electrical engineering
  - Interactive: Error calculator

- Lesson 1.2: Floating-Point Representation
  - Binary representation
  - IEEE 754 standard
  - Round-off errors
  - Interactive: Floating-point visualization

- Lesson 1.3: Error Analysis
  - Types of errors (round-off, truncation)
  - Error propagation
  - Significant figures
  - Interactive: Error propagation calculator

**Interactive Examples**:
- Calculate machine epsilon
- Demonstrate round-off error accumulation
- Visualize error propagation

**Acceptance Criteria**:
- All 3 lessons complete
- At least 2 interactive examples per lesson
- Code executes successfully
- Visualizations render correctly

---

#### MVP-006: Module 2 - Roots of Equations
**Description**: Finding roots of non-linear equations

**Content**:
- Lesson 2.1: Bisection Method
  - Algorithm explanation
  - Convergence criteria
  - Stopping conditions
  - Interactive: Animated bisection

- Lesson 2.2: Regula Falsi Method
  - False position approach
  - Comparison with bisection
  - Interactive: Regula Falsi animation

- Lesson 2.3: Newton-Raphson Method
  - Derivation from Taylor series
  - Convergence rate (quadratic)
  - Limitations
  - Interactive: Newton-Raphson with different functions

- Lesson 2.4: Secant Method
  - Derivative approximation
  - Comparison with Newton-Raphson
  - Interactive: Secant method visualization

**Interactive Examples**:
- Find root of f(x) = x³ - x - 2 (diode equation example)
- Compare convergence rates of all methods
- Visualize iterations on function plot
- Calculate number of iterations for given tolerance

**Acceptance Criteria**:
- All 4 lessons complete
- Animated iteration visualization
- Convergence comparison chart
- Real-world diode example

---

#### MVP-007: Module 3 - Linear Systems
**Description**: Solving systems of linear equations

**Content**:
- Lesson 3.1: Gauss Elimination
  - Forward elimination
  - Back substitution
  - Pivoting strategies
  - Interactive: Step-by-step Gauss elimination

- Lesson 3.2: LU Decomposition
  - Doolittle method
  - Crout method
  - Applications
  - Interactive: LU decomposition visualization

- Lesson 3.3: Jacobi Iteration
  - Iterative method basics
  - Convergence criteria
  - Interactive: Jacobi convergence plot

- Lesson 3.4: Gauss-Seidel Iteration
  - Improvement over Jacobi
  - Convergence comparison
  - Interactive: Gauss-Seidel vs Jacobi

**Interactive Examples**:
- Solve resistor network (3x3 system)
- Compare direct vs iterative methods
- Visualize convergence of iterative methods
- Circuit current calculation example

**Acceptance Criteria**:
- All 4 lessons complete
- Matrix operations visualized
- Convergence plots for iterative methods
- Resistor network example

---

#### MVP-008: Module 4 - Non-Linear Systems
**Description**: Solving systems of non-linear equations

**Content**:
- Lesson 4.1: Jacobian Matrix
  - Partial derivatives
  - Newton-Raphson for systems
  - Interactive: Jacobian calculation

- Lesson 4.2: Multi-Variable Root Finding
  - Newton-Raphson for systems
  - Convergence analysis
  - Interactive: 2-variable system solver

**Interactive Examples**:
- Solve power flow for 2-bus system
- Visualize Jacobian matrix
- Convergence analysis

**Acceptance Criteria**:
- All 2 lessons complete
- Jacobian matrix calculator
- 2-bus power flow example

---

#### MVP-009: Module 5 - Optimization
**Description**: One-dimensional numerical optimization

**Content**:
- Lesson 5.1: Golden Section Search
  - Interval reduction
  - Golden ratio
  - Algorithm steps
  - Interactive: Animated Golden Section Search

- Lesson 5.2: MPPT Application
  - Maximum Power Point Tracking
  - PV panel characteristics
  - P-V and I-V curves
  - Interactive: MPPT simulation

**Interactive Examples**:
- Find minimum of test functions
- MPPT for solar panel
- Visualize interval reduction
- Compare with exhaustive search

**Acceptance Criteria**:
- All 2 lessons complete
- Animated optimization process
- PV panel MPPT simulation
- P-V and I-V curve visualization

---

#### MVP-010: Module 6 - Interpolation
**Description**: Estimating values between data points

**Content**:
- Lesson 6.1: Lagrange Interpolation
  - Lagrange polynomials
  - Error analysis
  - Interactive: Lagrange polynomial builder

- Lesson 6.2: Newton Divided Differences
  - Divided difference table
  - Forward/backward differences
  - Interactive: Divided difference visualization

- Lesson 6.3: Cubic Spline Interpolation
  - Piecewise polynomials
  - Boundary conditions
  - Comparison with polynomial interpolation
  - Interactive: Spline vs polynomial comparison

**Interactive Examples**:
- Interpolate sensor temperature data
- Compare Lagrange vs Newton vs Spline
- Visualize Runge's phenomenon
- Real-world sensor data example

**Acceptance Criteria**:
- All 3 lessons complete
- All three interpolation methods implemented
- Comparison visualization
- Sensor data example

---

#### MVP-011: Module 7 - Integration & Differentiation
**Description**: Numerical calculus

**Content**:
- Lesson 7.1: Numerical Integration
  - Trapezoidal rule
  - Simpson's 1/3 and 3/8 rules
  - Error analysis
  - Interactive: Integration method comparison

- Lesson 7.2: Numerical Differentiation
  - Forward difference
  - Backward difference
  - Central difference
  - Error order analysis
  - Interactive: Difference method comparison

**Interactive Examples**:
- Calculate battery charge from current curve
- Compare integration methods
- Calculate motor speed from encoder data
- Error vs step size analysis

**Acceptance Criteria**:
- All 2 lessons complete
- Integration methods visualized
- Differentiation methods compared
- Error analysis plots

---

#### MVP-012: Module 8 - ODE Solutions
**Description**: Solving ordinary differential equations

**Content**:
- Lesson 8.1: Euler Methods
  - Forward Euler
  - Modified Euler
  - Stability analysis
  - Interactive: Euler method visualization

- Lesson 8.2: Runge-Kutta Methods
  - RK2 (Heun's method)
  - RK4 (classic)
  - Comparison with Euler
  - Interactive: RK4 vs Euler comparison

**Interactive Examples**:
- RC circuit transient response
- Compare Euler vs RK4 accuracy
- Stability analysis
- Step size effect on error

**Acceptance Criteria**:
- All 2 lessons complete
- Euler and RK4 methods implemented
- RC circuit example
- Accuracy comparison

---

#### MVP-013: Module 9 - Power Flow Project
**Description**: Team-Based Project support

**Content**:
- Lesson 9.1: Power Flow Basics
  - Power flow equations
  - Bus types (PQ, PV, Slack)
  - Interactive: Simple 2-bus example

- Lesson 9.2: Newton-Raphson Power Flow
  - Jacobian for power flow
  - Algorithm steps
  - Interactive: 3-bus power flow simulation

- Lesson 9.3: Project Template
  - Code template for TBP
  - Visualization tools
  - Example: 5-bus system

**Interactive Examples**:
- 2-bus power flow calculation
- 3-bus power flow with convergence plot
- Voltage profile visualization
- Power flow diagram

**Acceptance Criteria**:
- All 3 lessons complete
- Working power flow simulation
- Project template provided
- Visualization tools

---

#### MVP-014: Progress Tracking
**Description**: Track student progress through course

**Requirements**:
- Mark lessons as complete
- Store progress in localStorage
- Show completion percentage
- Highlight next lesson

**Acceptance Criteria**:
- Progress persists across sessions
- Percentage updates correctly
- User can mark lessons complete/incomplete

---

#### MVP-015: Responsive Design
**Description**: Works on desktop and mobile devices

**Requirements**:
- Mobile-first responsive design
- Breakpoints: 640px, 768px, 1024px, 1280px
- Touch-friendly buttons (44px min)
- Readable text on all screens

**Acceptance Criteria**:
- Usable on mobile (320px+)
- Usable on tablet (768px+)
- Usable on desktop (1024px+)
- No horizontal scrolling on mobile

---

### 4.2 Nice-to-Have Features (P1 - Post-MVP)

#### P1-001: Quizzes
- Multiple choice questions
- Immediate feedback
- Score tracking

#### P1-002: Dark Mode
- Toggle between light/dark themes
- Persist user preference

#### P1-003: Code History
- Save previous code versions
- Undo/redo functionality

#### P1-004: Export Results
- Export code + output as PDF
- Export plots as high-res images

#### P1-005: Search
- Search across all lessons
- Filter by topic

## 5. Out-of-Scope (Post-MVP)

### Explicitly Excluded

- User authentication and login
- Database persistence
- Backend API
- LMS integration (Moodle, Canvas, etc.)
- Video content
- Collaborative features (real-time)
- AI-powered assistance
- Offline mode
- Mobile app (native)
- Instructor dashboard/analytics
- Assignment submission system
- Grading system
- Discussion forums
- Multi-language support (beyond Indonesian/English)

## 6. Technical Constraints (MVP)

### Platform
- Browser-only (no server-side Python)
- WebAssembly required
- Modern browsers only
- Internet required for Pyodide CDN

### Performance Targets
- Initial load: < 10 seconds (Pyodide)
- Code execution: < 5 seconds (typical)
- Page navigation: < 1 second
- Plot rendering: < 3 seconds

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### No External Dependencies (User-Side)
- No Python installation required
- No Jupyter/Colab account needed
- No software downloads

## 7. Content Requirements

### Content Format
- Lessons in TypeScript/JSON
- Indonesian language (primary)
- English terminology (where appropriate)
- Mathematical notation using LaTeX-style

### Minimum Content per Lesson
- Learning objectives (CPMK)
- Theory explanation (500-1000 words)
- Mathematical formulations
- Step-by-step algorithm
- At least 1 interactive code example
- At least 1 visualization
- Real-world application example

### Total Content Scope
- 9 modules
- 23 lessons total
- ~50 interactive code examples
- ~25 visualizations

## 8. Success Metrics (MVP)

### User Engagement
- Code execution rate: > 50% per lesson
- Time on page: > 5 minutes per lesson
- Return visits: > 30%

### Technical Metrics
- Page load time: P95 < 3 seconds (after Pyodide)
- Code execution success rate: > 90%
- Error rate: < 10%

### Learning Outcomes
- Completion rate: > 40% of lessons
- Quiz scores (if implemented): > 60% average

## 9. MVP Timeline

### Sprint 1 (Week 1-2): Foundation
- Setup project structure
- Implement Pyodide integration
- Build code editor component
- Build visualization components

### Sprint 2 (Week 3-4): Core Modules
- Module 1: Introduction & Error Analysis
- Module 2: Roots of Equations
- Module 3: Linear Systems

### Sprint 3 (Week 5-6): Advanced Modules
- Module 4: Non-Linear Systems
- Module 5: Optimization
- Module 6: Interpolation

### Sprint 4 (Week 7-8): Final Modules
- Module 7: Integration & Differentiation
- Module 8: ODE Solutions
- Module 9: Power Flow Project

### Sprint 5 (Week 9-10): Polish & Testing
- Progress tracking
- Responsive design fixes
- Performance optimization
- User testing
- Bug fixes

### Total: 10 weeks

## 10. Risks & Mitigations (MVP)

### Risk 1: Pyodide Performance
**Likelihood**: High
**Impact**: High
**Mitigation**:
- Pre-load common libraries
- Use code splitting
- Provide loading indicators
- Set reasonable timeouts

### Risk 2: Content Volume
**Likelihood**: Medium
**Impact**: High
**Mitigation**:
- Prioritize core topics first
- Reuse visualization components
- Template-based lesson structure
- Focus on quality over quantity

### Risk 3: Browser Compatibility
**Likelihood**: Low
**Impact**: Medium
**Mitigation**:
- Test on target browsers early
- Provide graceful degradation
- Document browser requirements

### Risk 4: Time Constraints
**Likelihood**: Medium
**Impact**: High
**Mitigation**:
- Strict scope management
- MVP feature prioritization
- Regular progress reviews
- Cut less critical features if needed

## 11. MVP Exit Criteria

The MVP is considered complete when:

1. ✅ All 9 modules have at least 1 working lesson
2. ✅ Pyodide integration is stable and reliable
3. ✅ All interactive examples execute successfully
4. ✅ Visualizations render correctly
5. ✅ Platform is usable on mobile and desktop
6. ✅ Progress tracking works
7. ✅ No critical bugs (P0) remain
8. ✅ Performance targets met
9. ✅ User acceptance testing passed

## 12. Post-MVP Roadmap

### Phase 2: Enhanced Learning (Q2 2025)
- Quizzes and assessments
- Dark mode
- Code history
- Export functionality
- Search feature

### Phase 3: Platform Features (Q3 2025)
- User authentication
- Progress persistence (server-side)
- Instructor dashboard
- Analytics
- LMS integration

### Phase 4: Advanced Features (Q4 2025)
- AI-powered hints
- Collaborative coding
- Video content
- Mobile app
- Offline mode

---

**Document Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-01-14 | Z.ai | Initial MVP scope definition |
