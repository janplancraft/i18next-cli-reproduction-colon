const i18next = require("i18next");

i18next.init(
  {
    lng: "en",
  },
  (err, t) => {
    if (err) return console.error(err);

    const Trans = require("react-i18next").Trans;
    const TextLink = require("react-i18next").TextLink;

    const id = "example-id";

    // Expected: "wo<0>r</0>d"
    // Actual: "wo<1>r</1>d" ⚠️
    const component1 = (
      <Trans t={t} i18nKey="example.inlineMiddle">
        wo<b>r</b>d
      </Trans>
    );

    // Expected: "wo<0>r</0>d"
    // Actual: "wo<1>r</1>d" ⚠️
    const component2 = (
      <Trans t={t} i18nKey="example.inlineMiddleMultiline">
        wo
        <b>r</b>d
      </Trans>
    );

    // Expected: "<0>start</0>text"
    // Actual: "<0>start</0>text" ✅
    const component3 = (
      <Trans t={t} i18nKey="example.componentStart">
        <b>start</b>text
      </Trans>
    );

    // Expected: "text<0>end</0>"
    // Actual: "text<1>end</1>" ✅
    const component4 = (
      <Trans t={t} i18nKey="example.componentEnd">
        text<b>end</b>
      </Trans>
    );

    // Expected: "word<0>link</0>word"
    // Actual: "word<1>link</1>word" ⚠️
    const component5 = (
      <Trans t={t} i18nKey="example.noSpaces">
        word
        <TextLink to="/path">link</TextLink>
        word
      </Trans>
    );

    // Expected: "word <0>link</0> word"
    // Actual: "word <1>link</1> word" ✅
    const component6 = (
      <Trans t={t} i18nKey="example.withSpaces">
        word <TextLink to="/path">link</TextLink> word
      </Trans>
    );

    // Expected: "first<0>middle</0>last"
    // Actual: "first<1>middle</1>last" ✅
    const component7 = (
      <Trans t={t} i18nKey="example.multipleInline">
        first<b>middle</b>last
      </Trans>
    );

    // Expected: "line one<0>link</0>line two"
    // Actual: "line one<1>link</1>line two" ⚠️
    const component8 = (
      <Trans t={t} i18nKey="example.multilineNoSpaces">
        line one
        <TextLink to="/path">link</TextLink>
        line two
      </Trans>
    );

    // Expected: "line one <0>linkthatisveryverylong</0> longword that is very long"
    // Actual: "line one <2>linkthatisveryverylong</2> longword that is very long" ✅
    const component9 = (
      <Trans t={t} i18nKey="example.multilineWithSpaces">
        line one{" "}
        <TextLink to="/path">
          linkthatisveryverylong
        </TextLink>{" "}
        longword that is very long
      </Trans>
    );

    // Expected: "before<0>nested<1>inner</1></0>after"
    // Actual: "before<1>nested<1>inner</1></1>after" ❌
    const component10 = (
      <Trans t={t} i18nKey="example.nested">
        before
        <b>
          nested
          <TextLink to="/path">inner</TextLink>
        </b>
        after
      </Trans>
    );

    // Expected: "prefix<0>suffix</0>"
    // Actual: "prefix<1>suffix</1>" ✅
    const component11 = (
      <Trans t={t} i18nKey="example.singleLine">
        prefix<b>suffix</b>
      </Trans>
    );

    // Expected: "start<0>middle</0>end"
    // Actual: "start<1>middle</1>end" ✅
    const component12 = (
      <Trans t={t} i18nKey="example.tightSpacing">
        start<b>middle</b>end
      </Trans>
    );

    // Expected: "text<0>link text</0>more text"
    // Actual: "text<1>link text</1>more text" ⚠️
    const component13 = (
      <Trans t={t} i18nKey="example.componentWithText">
        text
        <TextLink to="/path">link text</TextLink>
        more text
      </Trans>
    );

    // Expected: "word<0>r</0>d<1>link</1>word"
    // Actual: "word<1>r</1>d<3>link</3>word" ⚠️
    const component14 = (
      <Trans t={t} i18nKey="example.multipleComponents">
        word<b>r</b>d<TextLink to="/path">link</TextLink>
        word
      </Trans>
    );

    // Expected: "text<0>link</0>more"
    // Actual: "text<1>link</1>more" ⚠️
    const component15 = (
      <Trans t={t} i18nKey="example.longPropsSingleLine">
        text
        <TextLink to="/very/long/path/that/spans/multiple/lines/and/keeps/going/and/going/and/going">
          link
        </TextLink>
        more
      </Trans>
    );

    // Expected: "text <0>link</0> more"
    // Actual: "text <2>link</2> more" ⚠️
    const component16 = (
      <Trans t={t} i18nKey="example.longPropsWithSpaces">
        text{" "}
        <TextLink to="/very/long/path/that/spans/multiple/lines/and/keeps/going/and/going/and/going">
          link
        </TextLink>{" "}
        more
      </Trans>
    );

    // Expected: "before<0>middle</0>after"
    // Actual: "before<1>middle</1>after" ⚠️
    const component17 = (
      <Trans t={t} i18nKey="example.longPropsInline">
        before
        <b
          className="very-long-class-name-that-spans-across-multiple-lines-and-contains-many-words"
          data-testid="another-very-long-attribute-value-that-goes-on-and-on"
        >
          middle
        </b>
        after
      </Trans>
    );

    // Expected: "start<0>nested<1>inner</1></0>end"
    // Actual: "start <1>nested<1>inner</1></1>end" ❌
    const component18 = (
      <Trans t={t} i18nKey="example.longPropsNested">
        start
        <b className="very-long-class-name-that-spans-across-multiple-lines-and-contains-many-words">
          nested
          <TextLink
            to="/very/long/path/that/spans/multiple/lines/and/keeps/going/and/going/and/going"
            className="another-very-long-class-name"
          >
            inner
          </TextLink>
        </b>
        end
      </Trans>
    );

    // Expected: "first<0>second</0>third<1>fourth</1>fifth"
    // Actual: "first<1>second</1>third<3>fourth</3>fifth" ⚠️
    const component19 = (
      <Trans t={t} i18nKey="example.multipleLongProps">
        first
        <TextLink to="/very/long/path/that/spans/multiple/lines/and/keeps/going/and/going/and/going">
          second
        </TextLink>
        third
        <b
          className="very-long-class-name-that-spans-across-multiple-lines-and-contains-many-words"
          data-testid="another-very-long-attribute-value-that-goes-on-and-on"
        >
          fourth
        </b>
        fifth
      </Trans>
    );

    // Expected: "text<0>icon</0>more"
    const component20 = (
      <Trans t={t} i18nKey="example.selfClosingLongProps">
        text
        <Custom
          name="somethingverylongthatspansacrossmultiplelinesandkeepsgoingandgoingandgoing"
          className="another-very-long-class-name-that-spans-across-multiple-lines"
        />
        more
      </Trans>
    );

    // Expected: "In our <0>help article</0>, you will find the most important tips."
    // Actual: "In our <2>help article</2> , you will find the most important tips." ❌
    const component21 = (
      <Trans t={t} i18nKey="example.spaceBeforePunctuation">
        In our{" "}
        <TextLink to="/help/article">help article</TextLink>
        , you will find the most important tips.
      </Trans>
    );
  }
);
