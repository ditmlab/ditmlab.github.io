# 소식 미리보기 사진 선택

`_posts/`의 해당 글 맨 위 `---` 사이에 `preview_image`를 적으면 홈의 최근 소식과 한영 소식 목록에서 그 사진을 사용합니다. 본문 사진의 순서를 바꿀 필요는 없습니다.

예: 수상 소식의 두 번째 사진을 선택하려면 `_posts/2026-06-05-award.md`에서 다음과 같이 지정합니다.

```yaml
preview_image: "/assets/img/20260605_award_2.jpeg"
preview_image_alt: "춘계통합학술대회 수상 기념사진"
preview_image_alt_en: "Award photo at the Joint Spring Conference"
```

- 경로는 본문 사진의 괄호 안 경로를 그대로 복사하면 됩니다.
- `preview_image_alt`와 `preview_image_alt_en`은 사진 설명입니다. 생략하면 해당 언어의 글 제목을 사용합니다.
- `preview_image_width`와 `preview_image_height`는 선택 사항입니다. 사진을 바꿀 때 크기를 모르면 두 항목을 삭제하세요.
- `preview_image`를 지정하지 않으면 기존 `home_image` 설정, 본문의 첫 사진 순으로 사용합니다. 사진이 없는 글에는 미리보기 사진을 표시하지 않습니다.
- 사진첩은 별도의 `_data/gallery.yml`로 관리하므로 이 설정의 영향을 받지 않습니다.

현재 수상·생신 글에는 기존에 보이던 사진을 `preview_image`로 명시했습니다.
