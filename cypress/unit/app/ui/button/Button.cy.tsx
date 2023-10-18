import { Button } from "packages/ui";
import { EButtonType } from "packages/ui/button/Button";
import { EVariant } from "packages/ui/constants";

describe("Button", () => {
  const VariantButton = ({ variant }: { variant: EVariant }) => (
    <Button
      data-cy="button"
      type={EButtonType.Button}
      value="Button"
      variant={variant}
    />
  );

  it("should render variants: primary, secondary, normal, success, warning, error", () => {
    cy.mount(
      <>
        {(Object.keys(EVariant) as Array<EVariant>).map((variant) => (
          <VariantButton key={`btn-variant-${variant}`} variant={variant} />
        ))}
      </>
    );
    cy.get("button");
  });
});
