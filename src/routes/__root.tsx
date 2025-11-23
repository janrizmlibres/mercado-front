import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { AuthProvider } from '../context/AuthProvider'

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <TanStackRouterDevtools />
    </AuthProvider>
  ),
})

