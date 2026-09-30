// Ultra-lightweight pub/sub store for real-time player position
// Completely decouples high-frequency movement coordinates from React component re-renders

export interface PlayerSpatialState {
  x: number;
  z: number;
  yaw: number;
  mode: string;
}

type Listener = (state: PlayerSpatialState) => void;

class PlayerStore {
  private state: PlayerSpatialState = {
    x: 0.0,
    z: 11.2,
    yaw: 0.0,
    mode: 'FIRST_PERSON'
  };

  private listeners = new Set<Listener>();

  public get(): PlayerSpatialState {
    return this.state;
  }

  public set(next: Partial<PlayerSpatialState>) {
    this.state = { ...this.state, ...next };
    for (const fn of this.listeners) {
      fn(this.state);
    }
  }

  public subscribe(fn: Listener): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }
}

export const playerStore = new PlayerStore();
