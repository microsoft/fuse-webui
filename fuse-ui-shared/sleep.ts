export async function sleep(time: number): Promise<void> {
  return new Promise<void>((resolve: Function, reject: Function) => {
    setTimeout(resolve, time);
  });
}
