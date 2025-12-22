# 유지관리(콘텐츠 업데이트) 가이드

이 저장소는 현재 **정적 HTML/CSS/JS**로 동작합니다.

콘텐츠(연구원, 논문 등)를 자주 업데이트해야 한다면, GitHub Pages가 기본 지원하는 **Jekyll**을 활용해
`Markdown / YAML 데이터 -> HTML 자동 생성` 구조로 바꾸면 유지관리가 훨씬 쉬워집니다.

아래는 “한 번에 전체를 갈아엎지 않고” 단계적으로 옮기는 권장 방식입니다.

---

## 1) 추천 구조 (Jekyll + 데이터)

- `_layouts/default.html`: 공통 레이아웃(헤더/푸터 포함)
- `_includes/header.html`, `_includes/footer.html`: 공통 컴포넌트
- `_data/members.yml`: 연구원 목록(이름/과정/키워드/링크)
- `_data/publications.yml`: 논문 목록(제목/저자/저널/연도/링크)
- `members.md`, `publications.md` 등: 화면 페이지(루프 렌더링)

장점:
- 연구원/논문은 **데이터 파일만 수정**하면 페이지가 자동으로 업데이트됨
- HTML 복붙/정렬 실수 줄어듦
- 메뉴/푸터 등 공통 영역 수정이 한 곳에서 끝남

---

## 2) GitHub Pages에서 가능한가?

네. `ditmlab.github.io` 같은 GitHub Pages 저장소는 기본적으로 Jekyll 빌드를 지원합니다.

주의:
- `members.html`처럼 **Liquid 템플릿(`{% ... %}`, `{{ ... }}`)**을 쓰는 페이지는, 로컬에서 `python3 -m http.server`로 열면 템플릿이 렌더링되지 않아 **깨져 보입니다**.
- 로컬에서 제대로 보려면 **Jekyll 서버로 실행**해야 합니다.

로컬 미리보기(권장):
- Ruby/Bundler 사용: `bundle exec jekyll serve --livereload`
- Ruby 설치가 번거로우면 Docker 사용:
  - `docker run --rm -p 4000:4000 -v "$PWD":/srv/jekyll jekyll/jekyll:4 jekyll serve --livereload --host 0.0.0.0`

가장 쉬운 확인 방법:
- GitHub에 푸시하면 GitHub Pages가 Jekyll로 빌드해서 배포하므로, 배포된 URL에서 정상 렌더링 결과를 확인할 수 있습니다.

---

## 3) 단계적 마이그레이션 방법 (안전)

1) **지금 HTML은 그대로 두고**, 먼저 `_includes`/`_layouts`만 추가
2) 가장 업데이트가 잦은 페이지부터 변환
   - 예: `members.html` -> `members.md` (이 때 기존 `members.html`은 이름을 바꿔 백업)
3) `_data/members.yml`로 연구원 목록을 옮기고, Liquid 템플릿으로 렌더링
4) publications도 동일하게 변환

---

## 4) 데이터 파일 예시

### `_data/members.yml`

```yml
- name_ko: "심해원"
  role: "Ph.D. Student"
  group: "박사과정"
  tags: ["Digital Transformation", "AI Management"]

- name_ko: "이하람"
  role: "M.S. Student"
  group: "석사과정"
  tags: ["Technology Management", "Innovation"]
```

현재는 [members.html](members.html)이 이 `_data/members.yml`을 읽어서 자동으로 렌더링되도록(템플릿화) 되어 있습니다.
즉, 연구원 추가/수정은 **HTML 수정 없이 `_data/members.yml`만 편집**하면 됩니다.

---

## 5) 다음 작업(원하면 내가 해줄 수 있음)

원하시면 아래를 실제로 코드에 적용해서 **완전 자동화**해드릴게요.

- Jekyll 폴더 구조 생성 (`_layouts`, `_includes`, `_data`, `_config.yml`)
- 헤더/푸터를 include로 분리
- 연구원/논문 페이지를 데이터 기반(`_data/*.yml`)으로 변환
- 로컬 미리보기 방법 안내 (`bundle exec jekyll serve`)
