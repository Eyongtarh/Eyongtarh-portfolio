// Fades content in as it scrolls into view. Wrap cards in this instead of
// animating the card itself, so Framer's inline transform never blocks CSS hover effects.
import PropTypes from "prop-types";
import { m, useReducedMotion } from "framer-motion";

const TAGS = {
  div: m.div,
  li: m.li,
  ul: m.ul,
  article: m.article,
  aside: m.aside,
  h2: m.h2,
  p: m.p,
};

export default function Reveal({
  as = "div",
  y = 40,
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const Tag = TAGS[as] ?? m.div;

  return (
    <Tag
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

Reveal.propTypes = {
  as: PropTypes.oneOf(Object.keys(TAGS)),
  y: PropTypes.number,
  delay: PropTypes.number,
  duration: PropTypes.number,
  amount: PropTypes.number,
  children: PropTypes.node,
};
