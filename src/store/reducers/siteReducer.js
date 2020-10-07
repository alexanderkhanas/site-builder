import {
  ADD_DEFAULT_IMAGE,
  SET_DEFAULT_IMAGES,
  SET_DIRECTIONS,
  SET_EDITING_SITE,
  SET_ELEMENTS,
  SET_HEADER_IMAGES,
  SET_SECTIONS_VARIATIONS,
  SET_TEMPLATES,
} from "../actions/actionTypes";

const initialState = {
  directions: [],
  templates: {},
  sections: [],
  sectionsVariations: {}, //[id]: variation[]
  headerImages: [],
  editingSite: {},
  images: {}, // template id: {key: imgArray}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_DIRECTIONS:
      return {
        ...state,
        directions: action.directions,
      };
    case SET_TEMPLATES:
      return {
        ...state,
        templates: {
          ...state.templates,
          [action.directionId]: action.templates,
        },
      };
    case SET_ELEMENTS:
      return {
        ...state,
        sections: action.elements,
      };
    case SET_SECTIONS_VARIATIONS:
      return {
        ...state,
        sectionsVariations: {
          ...state.sectionsVariations,
          [action.sectionId]: action.variations,
          templateId: action.templateId,
        },
      };
    case SET_HEADER_IMAGES:
      return {
        ...state,
        headerImages: action.headerImages,
      };
    case SET_EDITING_SITE:
      return {
        ...state,
        editingSite: action.site,
      };
    case SET_DEFAULT_IMAGES:
      return {
        ...state,
        images: {
          ...state.images,
          [action.templateId]: {
            ...state.images[action.templateId],
            [action.key]: {
              user: action.userImages,
              admin: action.adminImages,
            },
          },
        },
      };
    case ADD_DEFAULT_IMAGE:
      let copy = { ...state };
      copy.images[action.templateId][action.key].push(action.image);
      return copy;
    default:
      return state;
  }
};
