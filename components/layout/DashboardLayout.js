



export default function DashboardLayout({ children, role }){
    return(
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            {/* Main content */}
            <main>
                {children}
            </main>
        </div>
    )
}