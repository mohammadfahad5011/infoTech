"use client";
import { Component } from 'react'
import { FiAlertTriangle, FiRefreshCw } from 'react-icons/fi'
import Button from './Button'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error: error,
            errorInfo: errorInfo
        })

        // You can also log the error to an error reporting service
        console.error('Error caught by ErrorBoundary:', error, errorInfo)
    }

    handleRefresh = () => {
        window.location.reload()
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FiAlertTriangle className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Oops! Something went wrong
                        </h1>
                        <p className="text-gray-600 mb-6 max-w-md mx-auto">
                            We&apos;re sorry for the inconvenience. Please try refreshing the page or contact support if the problem persists.
                        </p>

                        {process.env.NODE_ENV === 'development' && (
                            <div className="mb-6">
                                <details className="text-left bg-gray-50 p-4 rounded-lg">
                                    <summary className="text-gray-700 font-medium cursor-pointer">
                                        Error Details
                                    </summary>
                                    <pre className="mt-2 text-sm text-red-600 overflow-auto">
                                        {this.state.error?.toString()}
                                        {"\n"}
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </details>
                            </div>
                        )}

                        <div className="space-x-4">
                            <Button onClick={this.handleRefresh}>
                                <FiRefreshCw className="w-4 h-4 mr-2" />
                                Refresh Page
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => window.history.back()}
                            >
                                Go Back
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary