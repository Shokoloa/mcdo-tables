import React from 'react';
import '../assets/styles/main.css';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
            copied: false,
        };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Erreur capturée par ErrorBoundary:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    handleCopy = async () => {
        const { error, errorInfo } = this.state;
        const textToCopy = `
          Erreur : ${error?.toString()}
          Stack : ${errorInfo?.componentStack}
        `;

        try {
            await navigator.clipboard.writeText(textToCopy);
            this.setState({ copied: true });
            setTimeout(() => this.setState({ copied: false }), 2000);
        } catch (err) {
            console.error("Erreur lors de la copie :", err);
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <main className="errorpage text">
                    <div className="bg"></div>
                    <section className="errorBackground">
                        <div></div>
                    </section>
                    <div className="defaulterror">
                        <h1>🚨 Oops... Quelque chose s'est mal passé de notre côté. 🚨</h1>
                        <p>Notre serveur a rencontré un problème inattendu. Essayez de recharger la page ou revenez plus tard.</p>
                        <article className="errorbuttons" style={{ marginTop: '5vh' }}>
                            <button className="secondary-button" onClick={() => { window.history.back(); setTimeout(() => { window.location.reload(); }, 100) }}>Précédent</button>
                            <button className={this.state.copied ? 'secondary-button active' : 'secondary-button'} onClick={this.handleCopy}>Copier les détails de l'erreur</button>
                        </article>
                    </div>
                </main>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;