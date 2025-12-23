import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Les Petits Plats",
  description: "Découvrez nos recettes du quotidien, simples et délicieuses",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
