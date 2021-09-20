import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useState } from "react";
import ImagePreview from "../components/ImagePreview";

export default function Home({ items }) {
  const [search, setSearch] = useState("");
  const [photos, setPhotos] = useState(items);

  return (
    <div className={styles.container}>
      <Head>
        <title>Nasa Image Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <hi className="title">Welcome to Nasa Gallery</hi>
        <div className={styles.fade}>
          <div className={styles.gridContainer}>
            {photos &&
              photos.map((preview) => (
                <ImagePreview
                  key={preview.data[0].nasa_id}
                  thumbnailUrl={preview.links[0].href}
                  nasaId={preview.data[0].nasa_id}
                />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
}
export async function getStaticProps() {
  const results = await fetch(
    "https://images-api.nasa.gov/search?media_type=image"
  );
  const previews = await results.json();
  const items = await previews.collection.items;
  return {
    props: { items },
  };
}
