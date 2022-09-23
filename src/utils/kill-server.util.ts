export function killServer(reason: string): void {
  console.error(`ERROR: ${reason}`);
  process.exit(1);
}
