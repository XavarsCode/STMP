# GitHub Copilot Instructions for STMP

## Project Context

**SSMP (Service de Suivi du Métro Parisien)** is a web platform project that models, estimates, and visualizes the circulation of Paris Metro trains on an interactive map using open public data.

The project transforms raw data (schedules, traffic, frequencies, disruptions) into a coherent spatial and temporal representation. It does **not** provide real GPS location of trains, but rather a **dynamic estimation based on temporal and topological models** of the network.

## Project Status

The project is currently in the **conception and modeling phase**. The tech stack is not yet defined for frontend, backend, or infrastructure.

## Core Concepts

### Network Modeling
- The network is modeled as a **directed graph**:
  - **Nodes**: stations
  - **Edges**: inter-station segments
  - Each edge has: distance, theoretical travel time, dynamic traffic coefficient

### Train Circulation Model
Each simulated train is defined by:
- A line
- A direction
- A starting station
- A target station
- A departure time
- A dynamic state (at station / in circulation)

### Data Sources
- **Static data**: Line routes, station lists, station order, connections, theoretical schedules (GTFS)
- **Dynamic data**: Traffic states by line, disruption messages, passage frequencies, declared delays (GTFS-RT / Navitia)
- **Providers**: Île-de-France Mobilités Open Data, Navitia API, official GTFS and GTFS-RT feeds

## Working Hypotheses

1. A train always travels **between two known stations**
2. Travel time between two stations is **approximable**
3. Disruptions primarily affect **effective speed**
4. GTFS and GTFS-RT data provide a reliable temporal base
5. A coherent estimation is more useful than illusory precision

## Coding Standards

### General Principles
- Write clear, maintainable code with meaningful variable and function names
- Prefer French for domain-specific terms related to the Paris Metro (e.g., "ligne", "rame", "station")
- Use English for technical/programming terms (e.g., "graph", "node", "edge")
- Document complex algorithms and business logic
- Prioritize **coherence and clarity** over absolute precision

### Code Documentation
- Add comments for non-obvious logic, especially in mathematical models
- Document assumptions and limitations
- Include references to data sources and their formats
- Explain the rationale behind estimation algorithms

### Testing
- Write tests for core algorithms (position calculation, traffic state management)
- Mock external API calls
- Test edge cases (traffic interruptions, missing data)
- Validate graph modeling logic

### Data Handling
- Never commit API keys or credentials
- Cache API responses appropriately to limit calls
- Handle missing or incomplete data gracefully
- Validate data from external sources

## Project Boundaries

### DO:
- Focus on modeling and estimation
- Use open public data sources
- Document assumptions and limitations
- Prioritize visual and temporal coherence
- Write educational and pedagogical code

### DON'T:
- Claim GPS precision (this is estimation)
- Pretend affiliation with RATP or Île-de-France Mobilités
- Ignore known limitations of the approach
- Add features that require real-time GPS data
- Commit secrets or API keys

## Architecture Guidelines

When implementing the tech stack:
- Choose modern, well-supported frameworks
- Prioritize developer experience and maintainability
- Consider scalability for handling multiple metro lines
- Plan for real-time data updates
- Design for interactive map visualization

## Contributing

- Write clear commit messages in English
- Keep pull requests focused and manageable
- Test changes before submitting
- Update documentation when changing behavior
- Respect the project's educational nature

## License

This project is under MIT License.
