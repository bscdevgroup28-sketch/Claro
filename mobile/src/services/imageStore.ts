import { Paths, File, Directory } from 'expo-file-system';

const DOCS_DIR_NAME = 'claro-docs';

function getDocsDir(): Directory {
  return new Directory(Paths.document, DOCS_DIR_NAME);
}

/**
 * Copy a captured image into the app's persistent document storage.
 * Returns the permanent local URI.
 */
export async function saveDocumentImage(sourceUri: string): Promise<string> {
  const dir = getDocsDir();
  if (!dir.exists) {
    dir.create();
  }
  const filename = `doc-${Date.now()}.jpg`;
  const source = new File(sourceUri);
  const dest = new File(dir, filename);
  source.copy(dest);
  return dest.uri;
}

/**
 * Delete a single document image from local storage.
 */
export async function deleteDocumentImage(uri: string): Promise<void> {
  try {
    const file = new File(uri);
    if (file.exists) {
      file.delete();
    }
  } catch {
    // File may already be deleted
  }
}

/**
 * Remove all stored document images. Used by the full-wipe action.
 */
export async function wipeAllImages(): Promise<void> {
  try {
    const dir = getDocsDir();
    if (dir.exists) {
      dir.delete();
    }
  } catch {
    // Ignore
  }
}
