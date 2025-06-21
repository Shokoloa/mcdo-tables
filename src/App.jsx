import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// CSS
import "./assets/styles/main.css";
import "./assets/styles/medias.css";
import "./assets/styles/themes.css";

const lazyWithDelay = (importFunc, delay = 0) => {
  return lazy(() =>
    Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delay)),
    ]).then(([module]) => module)
  );
};

// Components
import { Background } from "./components/Background";
const ScrollToTop = lazyWithDelay(() => import("./components/ScrollToTop").then(module => ({ default: module.ScrollToTop })));

// Pages
const Home = lazyWithDelay(() => import("./pages/index").then(module => ({ default: module.Home })));

// Errors
const Error = lazyWithDelay(() => import("./pages/Error").then(module => ({ default: module.Error })));
import ErrorBoundary from "./components/ErrorBoundary";

const Loader = () => {
  return (
    <main>
      <Background />
      <section className="loader">
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
        <div className="circle">
          <div className="dot"></div>
          <div className="outline"></div>
        </div>
      </section>
    </main >
  )
};

const Content = () => {
  return (
    <ErrorBoundary>
      <div className="text" style={{ transitionDuration: '1s' }}>
        <Background />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/error/:error" element={<Error />} />

          <Route path="*" element={<Error />} />
        </Routes >
        <ScrollToTop />
      </div >
    </ErrorBoundary>
  )
};

export const App = () => {
  const localStorageItem = localStorage.getItem('clickAnimation');

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        {window.innerWidth > 767 && localStorageItem === 'true' ? (
          <ClickSpark
            sparkColor='#0055FF'
            sparkSize={10}
            sparkRadius={20}
            sparkCount={8}
            duration={400}
          ><Content /></ClickSpark>
        ) : <Content />}
      </Suspense>
    </Router >
  )
}