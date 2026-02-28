import { Component } from 'react'
import { Link } from 'react-router-dom'

/**
 * ErrorBoundary para capturar errores en hijos (chunks lazy, etc.).
 * Muestra mensaje amigable y opción de volver o reintentar.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary:', error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null })
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center px-6 py-16 text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Algo salió mal al cargar esta página
          </h1>
          <p className="text-gray-600 text-sm max-w-md mb-8">
            Revisa tu conexión e intenta de nuevo. Si el problema persiste, vuelve al inicio.
          </p>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={this.handleRetry}
              className="px-5 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Reintentar
            </button>
            <Link
              to="/"
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              Ir al inicio
            </Link>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
