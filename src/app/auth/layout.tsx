import Header from './_components/header';
import MediaLogin from './_components/media-login';
import Welcome from './_components/welcome';
import AuthProvider from './_providers/auth.provider';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='flex min-h-screen gap-0'>
      {/* Welcome section */}
      <div className='w-1/2 hidden md:flex'>
        <Welcome />
      </div>

      {/* Content */}
      <div className='flex-1 bg-white p-20 flex flex-col'>
        {/* Header */}
        <Header />

        {/* Page */}
        <section className='grow flex flex-col justify-center items-center'>
          <AuthProvider>{children}</AuthProvider>

          {/* social media login */}
          <MediaLogin />
        </section>
      </div>
    </main>
  );
}
