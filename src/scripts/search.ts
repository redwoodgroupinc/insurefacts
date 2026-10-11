// Loads the Pagefind search UI on demand. Pagefind's files are generated into /pagefind/
// by `npm run build`, so search only works on a built site (not in `npm run dev`).

interface PagefindUIInstance {
  triggerSearch(term: string): void;
}

declare global {
  interface Window {
    PagefindUI?: new (options: Record<string, unknown>) => PagefindUIInstance;
  }
}

let assets: Promise<void> | undefined;

function loadAssets(): Promise<void> {
  assets ??= new Promise<void>((resolve, reject) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/pagefind/pagefind-ui.css';
    document.head.append(css);

    const script = document.createElement('script');
    script.src = '/pagefind/pagefind-ui.js';
    script.onload = () => resolve();
    script.onerror = () => {
      assets = undefined;
      reject(new Error('Search index not found'));
    };
    document.head.append(script);
  });
  return assets;
}

/** Mounts the search UI into `container` once and returns the instance. */
export async function mountSearch(
  container: HTMLElement,
  options: { query?: string; autofocus?: boolean; labelledBy?: string } = {},
): Promise<PagefindUIInstance | undefined> {
  const status = container.parentElement?.querySelector<HTMLElement>('[data-search-status]');
  try {
    await loadAssets();
  } catch {
    if (status) {
      status.hidden = false;
      status.textContent =
        'Search isn’t available right now. You can browse by country using the links on this page.';
    }
    return undefined;
  }
  if (!window.PagefindUI) return undefined;

  const instance = new window.PagefindUI({
    element: container,
    showSubResults: true,
    showImages: false,
    excerptLength: 24,
    autofocus: options.autofocus ?? true,
    translations: {
      placeholder: 'Search articles, topics and terms',
      zero_results: 'No results for [SEARCH_TERM]. Try a broader word, such as “car” or “travel”.',
    },
  });
  // Pagefind's input only has a title attribute; point it at the visible heading as its label.
  if (options.labelledBy) {
    container
      .querySelector('input.pagefind-ui__search-input')
      ?.setAttribute('aria-labelledby', options.labelledBy);
  }
  if (options.query) instance.triggerSearch(options.query);
  return instance;
}
