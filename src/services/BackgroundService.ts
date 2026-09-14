export class BackgroundService {
  getNextBackground(currentBackground: string): string {
    const backgrounds = ["pink-paper", "cream-stars", "soft-hearts"];
    const index = backgrounds.indexOf(currentBackground);
    return backgrounds[(index + 1) % backgrounds.length];
  }
}
