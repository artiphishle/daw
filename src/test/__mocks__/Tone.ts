export const Player = () => {
  return {
    load: (url: string) => Promise.resolve([["player1"], ["player2"]]),
    dispose: () => console.log("disposed"),
  };
};

export default function ToneMock() {
  return {
    Player,
  };
}
