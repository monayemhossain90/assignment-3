import { TReview } from './review.interface';
import Review from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const review = new Review(payload);
  const result = await review.save();
  return result;
};


export const ReviewServices = {
  createReviewIntoDB,

};
