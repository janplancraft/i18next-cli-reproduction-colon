const i18next = require("i18next");
const {
  initReactI18next,
  Trans,
  I18nextProvider,
} = require("react-i18next");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

// Store missing keys to access them directly
const missingKeys = new Map();

// Initialize i18next
i18next.use(initReactI18next).init(
  {
    lng: "en",
    saveMissing: true,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      // Store the missing key with its value
      missingKeys.set(key, fallbackValue);
      // Log it (this is what you see in console)
      console.log(
        `i18next::translator: missingKey ${lng} ${ns} ${key} ${fallbackValue}`
      );
      return fallbackValue;
    },
  },
  (err, t) => {
    if (err) return console.error(err);

    console.log("\n=== Missing Keys Map ===");
    missingKeys.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });

    // Components used in Trans examples - using standard HTML elements
    const TextLink = ({ to, children }) => (
      <a href={to}>{children}</a>
    );
    const Custom = ({ name, className }) => (
      <div className={className}>{name}</div>
    );
    const Text = ({
      fontSize,
      type,
      as,
      onClick,
      children,
      ...props
    }) => {
      const Component = as || "span";
      return (
        <Component
          style={fontSize ? { fontSize } : undefined}
          onClick={onClick}
          {...props}
        >
          {children}
        </Component>
      );
    };

    const id = "example-id";

    // Expected: "wo<1>r</1>d"
    // Actual: "wo<1>r</1>d" ✅
    const component1 = (
      <Trans t={t} i18nKey="example.inlineMiddle">
        wo<b>r</b>d
      </Trans>
    );

    // Expected: "wo<1>r</1>d"
    // Actual: "wo<1>r</1>d" ✅
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

    // Expected: "text<1>end</1>"
    // Actual: "text<1>end</1>" ✅
    const component4 = (
      <Trans t={t} i18nKey="example.componentEnd">
        text<b>end</b>
      </Trans>
    );

    // Expected: "word<1>link</1>word"
    // Actual: "word<1>link</1>word" ✅
    const component5 = (
      <Trans t={t} i18nKey="example.noSpaces">
        word
        <TextLink to="/path">link</TextLink>
        word
      </Trans>
    );

    // Expected: "word <1>link</1> word"
    // Actual: "word <1>link</1> word" ✅
    const component6 = (
      <Trans t={t} i18nKey="example.withSpaces">
        word <TextLink to="/path">link</TextLink> word
      </Trans>
    );

    // Expected: "first<1>middle</1>last"
    // Actual: "first<1>middle</1>last" ✅
    const component7 = (
      <Trans t={t} i18nKey="example.multipleInline">
        first<b>middle</b>last
      </Trans>
    );

    // Expected: "line one<1>link</1>line two"
    // Actual: "line one<1>link</1>line two" ✅
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

    // Expected: "before<1>nested<2>inner</2></1>after"
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

    // Expected: "prefix<1>suffix</1>"
    // Actual: "prefix<1>suffix</1>" ✅
    const component11 = (
      <Trans t={t} i18nKey="example.singleLine">
        prefix<b>suffix</b>
      </Trans>
    );

    // Expected: "start<1>middle</1>end"
    // Actual: "start<1>middle</1>end" ✅
    const component12 = (
      <Trans t={t} i18nKey="example.tightSpacing">
        start<b>middle</b>end
      </Trans>
    );

    // Expected: "text<1>link text</1>more text"
    // Actual: "text<1>link text</1>more text" ✅
    const component13 = (
      <Trans t={t} i18nKey="example.componentWithText">
        text
        <TextLink to="/path">link text</TextLink>
        more text
      </Trans>
    );

    // Expected: "word<1>r</1>d<3>link</3>word"
    // Actual: "word<1>r</1>d<3>link</3>word" ✅
    const component14 = (
      <Trans t={t} i18nKey="example.multipleComponents">
        word<b>r</b>d<TextLink to="/path">link</TextLink>
        word
      </Trans>
    );

    // Expected: "text<1>link</1>more"
    // Actual: "text<1>link</1>more" ✅
    const component15 = (
      <Trans t={t} i18nKey="example.longPropsSingleLine">
        text
        <TextLink to="/very/long/path/that/spans/multiple/lines/and/keeps/going/and/going/and/going">
          link
        </TextLink>
        more
      </Trans>
    );

    // Expected: "text <2>link</2> more"
    // Actual: "text <2>link</2> more" ✅
    const component16 = (
      <Trans t={t} i18nKey="example.longPropsWithSpaces">
        text{" "}
        <TextLink to="/very/long/path/that/spans/multiple/lines/and/keeps/going/and/going/and/going">
          link
        </TextLink>{" "}
        more
      </Trans>
    );

    // Expected: "before<1>middle</1>after"
    // Actual: "before<1>middle</1>after" ✅
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

    // Expected: "start<1>nested<1>inner</1></1>end"
    // Actual: "start<1>nested<1>inner</1></1>end" ✅
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

    // Expected: "first<1>second</1>third<3>fourth</3>fifth"
    // Actual: "first<1>second</1>third<3>fourth</3>fifth" ✅
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

    // Expected: "text<1></1>more"
    // Actual: "text<1></1>more" ✅
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

    // Expected: "In our <2>help article</2>, you will find the most important tips."
    // Actual: "In our <2>help article</2>, you will find the most important tips." ✅
    const component21 = (
      <Trans t={t} i18nKey="example.spaceBeforePunctuation">
        In our{" "}
        <TextLink to="/help/article">help article</TextLink>
        , you will find the most important tips.
      </Trans>
    );

    // Expected: "<br/>Your feedback will be incorporated into the further development of this application and will be discussed, evaluated, and prioritized by us in the next step. Due to the large amount of feedback we receive, we are unfortunately unable to respond to each piece of feedback individually.<br/><br/><4>If you have any questions or problems, please contact our <2>free support</2>.</4>"
    // Actual: "<br />Your feedback will be incorporated into the further development of this application and will be discussed, evaluated, and prioritized by us in the next step. Due to the large amount of feedback we receive, we are unfortunately unable to respond to each piece of feedback individually.<br /><br /><4>If you have any questions or problems, please contact our <6>free support</6>.</4>" ⚠️
    const component22 = (
      <Trans t={t} i18nKey="example.feedbackDescription">
        <br />
        Your feedback will be incorporated into the further
        development of this application and will be
        discussed, evaluated, and prioritized by us in the
        next step. Due to the large amount of feedback we
        receive, we are unfortunately unable to respond to
        each piece of feedback individually.
        <br />
        <br />
        <b>
          If you have any questions or problems, please
          contact our{" "}
          <Text
            fontSize="inherit"
            type="button"
            as="button"
            onClick={() => {
              // Example handler
            }}
          >
            free support
          </Text>
          .
        </b>
      </Trans>
    );

    // Expected: "This <2>can affect existing records</2> associated with this item. Alternatively, you can create a new item and assign it to your records."
    // Actual: "This <strong> can affect existing records </strong> associated with this item. Alternatively, you can create a new item and assign it to your records." ❌
    const component23 = (
      <Trans t={t} i18nKey="example.actionWarning">
        This <strong>can affect existing records</strong>{" "}
        associated with this item. Alternatively, you can
        create a new item and assign it to your records.
      </Trans>
    );

    // Expected: "You can easily change the role, and thus the access rights, of your users. To do this, navigate to the <2>team settings</2>. There you can define a role for each user in their individual settings."
    // Actual: "You can easily change the role, and thus the access rights, of your users. To do this, navigate to the <2>team settings</2>. There you can define a role for each user in their individual settings." ✅
    const component24 = (
      <Trans t={t} i18nKey="example.permissionInfo">
        You can easily change the role, and thus the access
        rights, of your users. To do this, navigate to the{" "}
        <TextLink target="_blank" to="/settings/team">
          team settings
        </TextLink>
        . There you can define a role for each user in their
        individual settings.
      </Trans>
    );

    // Expected: "You can easily change the role, and thus the access rights, of your users. To do this, navigate to the<1>team settings</1>. There you can define a role for each user in their individual settings."
    // Actual: "You can easily change the role, and thus the access rights, of your users. To do this, navigate to the <1>team settings</1>. There you can define a role for each user in their individual settings." ❌
    const component25 = (
      <Trans t={t} i18nKey="example.permissionInfoNoSpace">
        You can easily change the role, and thus the access
        rights, of your users. To do this, navigate to the
        <TextLink target="_blank" to="/settings/team">
          team settings
        </TextLink>
        . There you can define a role for each user in their
        individual settings.
      </Trans>
    );

    // Render all components to trigger the missing key handler
    const components = [
      component1,
      component2,
      component3,
      component4,
      component5,
      component6,
      component7,
      component8,
      component9,
      component10,
      component11,
      component12,
      component13,
      component14,
      component15,
      component16,
      component17,
      component18,
      component19,
      component20,
      component21,
      component22,
      component23,
      component24,
      component25,
    ];

    console.log(
      "\n=== Rendering components to trigger missing keys ===\n"
    );
    components.forEach((component, index) => {
      try {
        // Wrap in I18nextProvider to provide i18n context
        const wrapped = React.createElement(
          I18nextProvider,
          { i18n: i18next },
          component
        );
        ReactDOMServer.renderToString(wrapped);
      } catch (err) {
        console.error(
          `Error rendering component ${index + 1}:`,
          err.message
        );
      }
    });

    // Show final summary
    console.log("\n=== Final Missing Keys Summary ===");
    console.log(`Total missing keys: ${missingKeys.size}`);
    missingKeys.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    });
  }
);
