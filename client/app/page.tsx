import googleOauth from '@/utils/googleOauth';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <a href={googleOauth()}>Login with Google</a>
    </main>
  )
}
