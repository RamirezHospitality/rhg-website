/*
 * Ramirez Hospitality Group — LeadConnector "Opt In Form" embed
 *
 * The one capture form on the site. Rendered inside CrmCaptureForm on the
 * audit, feasibility, and /lp pages, and directly in the "Send a Message"
 * column of the Contact page. Fields, the two unchecked SMS consent boxes,
 * the Privacy / Terms links, button label, and styling are all configured in
 * LeadConnector's form builder (Sites → Forms), not here.
 *
 * The iframe attributes mirror LeadConnector's embed snippet exactly. Its
 * helper script (https://link.msgsndr.com/js/form_embed.js) is loaded once
 * in client/index.html and resizes the iframe from postMessage events, so a
 * form mounted after client-side navigation still sizes correctly. The
 * explicit height matches the snippet's data-height so nothing collapses
 * before the script runs.
 */

export const LEADCONNECTOR_FORM_ID = "Skmmsxecczs1LoY79WxK";
const FORM_NAME = "Opt In Form";
const FORM_HEIGHT = 1148;

interface LeadConnectorOptInFormProps {
  className?: string;
}

export function LeadConnectorOptInForm({ className = "" }: LeadConnectorOptInFormProps) {
  return (
    <iframe
      src={`https://api.leadconnectorhq.com/widget/form/${LEADCONNECTOR_FORM_ID}`}
      style={{ width: "100%", height: FORM_HEIGHT, border: "none", borderRadius: 4 }}
      className={className}
      id={`inline-${LEADCONNECTOR_FORM_ID}`}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name={FORM_NAME}
      data-height={String(FORM_HEIGHT)}
      data-layout-iframe-id={`inline-${LEADCONNECTOR_FORM_ID}`}
      data-form-id={LEADCONNECTOR_FORM_ID}
      data-cookie-consent="true"
      data-cookie-consent-provider="auto"
      title={FORM_NAME}
    />
  );
}
