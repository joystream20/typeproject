import type { ClassType } from '../types/type'


export const type = (txt: Ref<string>) => {
  return txt
}


export const changeClass = () =>
  useState<ClassType>("stClass", () => {
    return {
      type: "page",
      cls: "home",
      lng:"ja"
    };
  });

