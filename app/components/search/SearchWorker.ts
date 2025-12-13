import Fuse from 'fuse.js';
import { Station } from '@/app/interfaces';

let fuse: Fuse<Station> | null = null;

self.onmessage = (event: MessageEvent) => {
  const { type, payload } = event.data;

  if (type === 'init') {
    const stationsArray = Object.entries(payload.stations).map((entry) => ({
      name: entry[0] as string,
      crs: entry[1] as string,
    }));

    fuse = new Fuse(stationsArray, {
      keys: ['name', 'crs'],
    });

    return;
  }

  if (type === 'search') {
    if (!fuse) return;

    self.postMessage(
      fuse
        .search(payload.input)
        .slice(0, 16)
        .map((result) => result.item),
    );
  }
};
