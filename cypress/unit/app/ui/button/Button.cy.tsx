import { Button } from 'packages/pfui';
import { EVariant, EButtonType, ESize } from 'packages/pfui/constants';

describe('Button', () => {
  const VariantButton = ({ variant }: { variant: EVariant }) => (
    <Button
      data-cy="button"
      size={ESize.Lg}
      type={EButtonType.Button}
      value="Button"
      variant={variant}
    />
  );

  it('should render variants: primary, secondary, normal, success, warning, error', () => {
    cy.mount(
      <>
        {(Object.keys(EVariant) as Array<EVariant>).map((variant) => (
          <VariantButton key={`btn-variant-${variant}`} variant={variant} />
        ))}
      </>,
    );
    cy.get('button');
  });
});
