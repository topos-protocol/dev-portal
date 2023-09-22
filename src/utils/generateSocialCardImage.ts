import jimp from 'jimp';
import path from 'path';
import formatSlugToImageName from './formatSlugToImageName';

const generateSocialCardImage = async (context: any) => {
  const {
    frontmatter: { title },
    slug,
  } = context;
  const imageName = formatSlugToImageName(slug);
  const WIDTH = 1200;
  const HEIGHT = 628;
  const PADDING = 40;

  await Promise.all([
    jimp.read(path.join(__dirname, '../images/social-card-template.png')),
    jimp.loadFont(path.join(__dirname, '../fonts/roboto.fnt')),
  ]).then(([image, font]) => {
    image
      .resize(WIDTH, HEIGHT)
      .print(
        font,
        PADDING,
        PADDING,
        {
          text: title,
          alignmentY: jimp.VERTICAL_ALIGN_BOTTOM,
        },
        WIDTH, // maxWidth
        HEIGHT - PADDING * 2 // maxHeight
      )
      .write(
        path.join(__dirname, '../../public/social-cards', `${imageName}.png`)
      );
  });
};

export default generateSocialCardImage;
