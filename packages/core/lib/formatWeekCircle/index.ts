interface IOption {
  allText?: string;
  separator?: string;
}

interface CircleItem {
  name: string;
  id: number;
}
/**
 * 简写星期列表
 * @param {string[]} circle 星期列表，例如["周一", "周二", "周四"]
 * @param {IOption} optionsParam 配置项
 * - {string} allText: 当星期列表包含一周7天的时候，显示的文字，默认显示“周一~周日”
 * - {string} separator: 非连续日期分隔符，默认为“、”
 * @returns {string} '周一~周三、周四'
 */
export function formatWeekCircle(
  circle: string[],
  optionsParam?: IOption
): string {
  const CIRCLES: CircleItem[] = [
    { name: "周一", id: 1 },
    { name: "周二", id: 2 },
    { name: "周三", id: 3 },
    { name: "周四", id: 4 },
    { name: "周五", id: 5 },
    { name: "周六", id: 6 },
    { name: "周日", id: 7 },
  ];
  const defaultOptions = {
    allText: "周一~周日",
    separator: "、",
  };
  const options = { ...defaultOptions, ...optionsParam };
  if (circle.length === 7) {
    return options.allText;
  }
  const newCircle = circle
    .map((circleItem) => {
      const match = CIRCLES.find((item) => item.name === circleItem);
      if (match) {
        return match;
      }
      return {};
    })
    .sort((a, b) => {
      return (a as CircleItem).id > (b as CircleItem).id ? 1 : -1;
    }) as CircleItem[];
  let index = 0;
  const output = [];
  while (index < newCircle.length) {
    const lastItem = getContinuousLastItem(newCircle, index);
    if (lastItem.id === newCircle[index].id) {
      output.push(newCircle[index].name);
      index++;
    } else if (lastItem.id - newCircle[index].id === 1) {
      output.push(
        `${newCircle[index].name}${options.separator}${lastItem.name}`
      );
      index += 2;
    } else {
      output.push(`${newCircle[index].name}~${lastItem.name}`);
      index = newCircle.findIndex((item) => item.id === lastItem.id) + 1;
    }
  }
  return output.join(options.separator);
}
function getContinuousLastItem(arr: CircleItem[], index: number) {
  for (let i = index; i < arr.length - 1; i++) {
    if (arr[i + 1].id - arr[i].id > 1) {
      return arr[i];
    }
  }
  return arr[arr.length - 1];
}
