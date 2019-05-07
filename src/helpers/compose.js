export default function compose(...args) {
  return args.reduceRight((acc, current) => current(acc));
}
