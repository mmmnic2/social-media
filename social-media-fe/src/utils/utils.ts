export const parseTime = (createPostTime: any) => {
  const secondLimit = 1000 * 60;
  const minuteLimit = secondLimit * 60;
  const hourLimit = minuteLimit * 24;
  const dayLimit = hourLimit * 7;
  //tương ứng với 2 tuần sau đó sẽ xuất hiện ngày tháng năm
  const weekLimit = hourLimit * 7 * 3;
  const fixedDateString: string = createPostTime?.replace(/\+00:00$/, "Z");
  const date: Date = new Date(fixedDateString);
  const currentDate: Date = new Date();
  // Tính số mili giây chênh lệch (milliseconds)
  const timeDifference: number = currentDate.getTime() - date.getTime();

  let display: string = "";
  if (timeDifference < secondLimit) {
    const secondDiff: number = Math.floor(timeDifference / 1000);
    display = `${secondDiff} giây`;
  } else if (timeDifference >= secondLimit && timeDifference < minuteLimit) {
    const minuteDiff: number = Math.floor(timeDifference / secondLimit);
    display = `${minuteDiff} phút`;
  } else if (timeDifference >= minuteLimit && timeDifference < hourLimit) {
    const hourDiff: number = Math.floor(timeDifference / minuteLimit);
    display = `${hourDiff} giờ`;
  } else if (timeDifference >= hourLimit && timeDifference < dayLimit) {
    const dayDiff: number = Math.floor(timeDifference / hourLimit);
    display = `${dayDiff} ngày`;
  } else if (timeDifference >= dayLimit && timeDifference < weekLimit) {
    const weekDiff: number = Math.floor(timeDifference / dayLimit);
    display = `${weekDiff} tuần`;
  } else {
    const day: number = date.getUTCDate();
    const month: number = date.getUTCMonth() + 1; // Tháng bắt đầu từ 0
    const year: number = date.getUTCFullYear();
    if (currentDate.getUTCFullYear() === year) {
      display = `${day} tháng ${month}`;
    } else {
      display = `${day} tháng ${month}, ${year}`;
    }
    // Định dạng lại ngày tháng theo ý muốn (dd/mm/yyyy)
  }
  return display;
};

export const isUserLiked = (postId: number, userId: number) => {};
