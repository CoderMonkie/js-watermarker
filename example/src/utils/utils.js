/*
 * @Description:
 * @Autor: 码路工人<maonianyou@foxmail.com>
 * @Date: 2021-07-27 09:57:50
 * @LastEditors: 码路工人<maonianyou@foxmail.com>
 */
export const getToday = () => {
  const d = new Date();
  const formatToday = `${d.getFullYear()}-${(d.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${d.getDate().toString().padStart(2, "0")}`;
  return formatToday;
};
