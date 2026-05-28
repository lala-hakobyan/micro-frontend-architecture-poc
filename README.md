# Micro-frontend Architecture POC Projects

A collection of Micro-Frontend (MFE) architecture POCs designed to reflect best practices in distributed front-end systems. Intended for experimenting with orchestration patterns such as **Next.js Multi-Zones**, **Module Federation** and **Native Federation**, benchmarking cross-app performance and creating scalable foundations for real production apps.

## Projects

### [Next.js Multi-Zones Micro-frontend Architecture (`multi-zones-nextjs`)](./apps/multi-zones-nextjs)

Fintech app POC that follows a Next.js Multi-Zones Micro-frontend Architecture with **Speculative Loading** performance optimization. It consists of the following projects:

- [Shell](./apps/multi-zones-nextjs/shell): Used for routing and proxying micro-frontend paths. It does not have its own UI and redirects to the default Market Data platform on first load.
- [Market Data Platform Micro-frontend](./apps/multi-zones-nextjs/market-data-mfe)
- [Market Data Asset Detail Platform Micro-frontend](./apps/multi-zones-nextjs/market-data-details-mfe)
- [Portfolio Platform Micro-frontend](./apps/multi-zones-nextjs/portfolio-mfe)
- [Trading Platform Micro-frontend](./apps/multi-zones-nextjs/trading-mfe)

In Next.js Multi-Zones architecture, the shell routes traffic to independently owned micro-frontends by proxying their paths. Each micro-frontend is served as a separate standalone Next.js application. Micro-frontends link to each other, giving users the impression of a single application. However, because each cross-zone navigation loads a separate document from another standalone Next.js application, navigation between micro-frontends can feel slower than client-side navigation inside a single-page application.

Speculative Loading reduces this perceived performance gap. Each micro-frontend defines speculation rules that allow the browser to **prefetch** or **prerender** links that are likely to be clicked. When the user clicks one of those links, the navigation can feel almost instant. This helps the overall architecture provide a smoother experience that is closer to single-page application navigation while keeping each micro-frontend independently served.

# License
This project is released under the [MIT License](./LICENSE).

- **Usage:** You are welcome to clone and fork this repository for experimenting.
- **Credit:** If you share or publish your own version, please retain the original license and give appropriate credit to [Lala Hakobyan](https://github.com/lala-hakobyan) or link back to the original repository.
- **Contributions:** I am not accepting pull requests for this project at this time.
- **Feedback:** If you found a bug, have a feedback or question, please feel free to reach out via [LinkedIn](https://www.linkedin.com/in/lala-hakobyan) or submit an issue on the [**Issues page**](https://github.com/lala-hakobyan/micro-frontend-architecture-poc/issues) on GitHub.

# Author
**Name:** Lala Hakobyan  
**Email:** [hakobyanlala@gmail.com](mailto:hakobyanlala@gmail.com)  
**LinkedIn Profile:** [linkedin.com/in/lala-hakobyan](https://www.linkedin.com/in/lala-hakobyan)    