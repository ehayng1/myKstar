// lrc (String) - lrc file text

function parseLyric(lrc) {
  // will match "[00:00.00] ooooh yeah!"
  // note: i use named capturing group
  const regex = /^\[(?<time>\d{2}:\d{2}(.\d{2})?)\](?<line>.*)/;
  // split lrc string to individual lines
  const lines = lrc.split("\n");

  const output = [];

  lines.forEach((lyric) => {
    const match = lyric.match(regex);

    // if doesn't match, return.
    if (match == null) return;

    const { time, line } = match.groups;
    // let time = lyric.slice(1, 9);
    // let text = lyric.slice(11)
    output.push({
      time: parseTime(time),
      line: line.trim(),
    });
  });

  // parse formated time
  // "03:24.73" => 204.73 (total time in seconds)
  function parseTime(time) {
    const minsec = time.split(":");

    const min = parseInt(minsec[0]) * 60;
    const sec = parseFloat(minsec[1]);

    // convert to milisec
    return Math.round((min + sec) * 1000) + 4150;
  }

  return output;
}

parseLyric(
  (lrc = `[00:05.82] 오빤 강남 스타일
[00:09.81] 강남스타일
[00:14.56] 낮에는 따사로운 인간적인 여자
[00:17.86] 커피 한잔의 여유를 아는 품격 있는 여자
[00:21.45] 밤이 오면 심장이 뜨거워지는 여자
[00:25.01] 그런 반전 있는 여자
[00:28.67] 나는 사나이
[00:30.02] 낮에는 너만큼 따사로운 그런 사나이
[00:33.59] 커피 식기도 전에 원샷 때리는 사나이
[00:37.23] 밤이 오면 심장이 터져버리는 사나이
[00:40.82] 그런 사나이
[00:43.17] 아름다워 사랑스러워
[00:46.89] 그래 너 hey 그래 바로 너 hey
[00:50.30] 아름다워 사랑스러워
[00:53.91] 그래 너 hey 그래 바로 너 hey
[00:57.62] 지금부터 갈 데까지 가볼까
[01:05.52] 오빤 강남스타일
[01:09.60] 강남스타일
[01:10.99] 오 오 오 오 오빤 강남스타일
[01:16.96] 강남스타일
[01:18.06] 오 오 오 오 오빤 강남스타일
[01:21.74] Eh- Sexy Lady
[01:25.41] 오 오 오 오 오빤 강남스타일
[01:28.97] Eh- Sexy Lady
[01:32.61] 오 오 오 오
[01:36.32] 정숙해 보이지만 놀 땐 노는 여자
[01:39.74] 이때다 싶으면 묶었던 머리 푸는 여자
[01:43.14] 가렸지만 웬만한 노출보다 야한 여자
[01:46.81] 그런 감각적인 여자
[01:50.45] 나는 사나이
[01:51.98] 점잖아 보이지만 놀 땐 노는 사나이
[01:55.23] 때가 되면 완전 미쳐버리는 사나이
[01:58.86] 근육보다 사상이 울퉁불퉁한 사나이
[02:02.65] 그런 사나이
[02:05.19] 아름다워 사랑스러워
[02:08.52] 그래 너 hey 그래 바로 너 hey
[02:12.16] 아름다워 사랑스러워
[02:15.87] 그래 너 hey 그래 바로 너 hey
[02:19.45] 지금부터 갈 데까지 가볼까
[02:27.46] 오빤 강남스타일
[02:31.40] 강남스타일
[02:32.67] 오 오 오 오 오빤 강남스타일
[02:38.73] 강남스타일
[02:40.00] 오 오 오 오 오빤 강남스타일
[02:43.57] Eh- Sexy Lady
[02:47.25] 오 오 오 오 오빤 강남스타일
[02:50.72] Eh- Sexy Lady
[02:54.50] 오 오 오 오
[02:58.15] 뛰는 놈 그 위에 나는 놈
[03:01.21] baby baby 나는 뭘 좀 아는 놈
[03:05.27] 뛰는 놈 그 위에 나는 놈
[03:08.41] baby baby 나는 뭘 좀 아는 놈
[03:11.46] You know what I'm saying
[03:13.08] 오빤 강남스타일
[03:14.69] Eh- Sexy Lady
[03:19.87] 오 오 오 오 오빤 강남스타일
[03:23.50] Eh- Sexy Lady
[03:27.23] 오 오 오 오 오빤 강남스타일
[03:32.61]`)
);
