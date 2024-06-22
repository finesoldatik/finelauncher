import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
	console.log('ReactQueryProvider Render')

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
