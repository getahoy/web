import { createCn } from "cn/config";

// Custom font sizes look like text colours to the merger, so without this
// a size class silently drops the colour class beside it, or the reverse.
export const cn = createCn({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "tiny",
            "eyebrow",
            "caption",
            "micro",
            "body-sm",
            "button",
            "tag",
            "body",
            "body-lg",
            "wordmark",
            "heard",
            "quote",
            "title",
            "reveal",
            "heading",
            "display",
            "giant",
          ],
        },
      ],
    },
  },
});
