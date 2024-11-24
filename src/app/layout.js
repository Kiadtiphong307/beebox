import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Beebox',
  description: 'Beebox Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
