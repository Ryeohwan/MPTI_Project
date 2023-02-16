package mpti.domain.opinion.application;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import mpti.common.errors.ReviewNotFoundException;
import mpti.common.errors.ServerCommunicationException;
import mpti.domain.opinion.api.request.CreateReviewRequest;
import mpti.domain.opinion.api.request.DeleteReviewRequest;
import mpti.domain.opinion.api.request.UpdateStarRequest;
import mpti.domain.opinion.api.response.GetReviewResponse;
import mpti.domain.opinion.dao.ReviewRepository;
import mpti.domain.opinion.dto.ReviewDto;
import mpti.domain.opinion.entity.Review;
import mpti.domain.opinion.entity.Role;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private OkHttpClient client = new OkHttpClient();

    private final Gson gson;

    public static final MediaType JSON = MediaType.get("application/json; charset=utf-8");

    @Value("${server_url.sendAverageStar}")
    private String sendAverageStar;

    public Page<GetReviewResponse> getReviewList(int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));

        Page<Review> reviewList = reviewRepository.findAllByOrderByStarDesc(pageRequest);

        Page<GetReviewResponse> getReviewResponse = reviewList
                .map((review) -> new GetReviewResponse(review));
//                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public Page<GetReviewResponse> getTrainerReviewList(Long trainerId, int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));

        Page<Review> reviewList = reviewRepository.findAllByTargetId(trainerId, pageRequest);

        Page<GetReviewResponse> getReviewResponse = reviewList
                .map((review) -> new GetReviewResponse(review));
//                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public Page<GetReviewResponse> getReviewListByWriterId(Long writerId, int page, int size, String orderType) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, orderType));

        Page<Review> reviewList = reviewRepository.findByWriterId(writerId, pageRequest);

        Page<GetReviewResponse> getReviewResponse = reviewList
                .map((review) -> new GetReviewResponse(review));
//                .collect(Collectors.toList());
        return getReviewResponse;
    }

    public ReviewDto create(CreateReviewRequest createReviewRequest) throws IOException {
        Review review = Review.builder()
                .writerId(createReviewRequest.getWriterId())
                .writerName(createReviewRequest.getWriterName())
                .targetId(createReviewRequest.getTargetId())
                .targetName(createReviewRequest.getTargetName())
                .memo(createReviewRequest.getMemo())
                .star(createReviewRequest.getStar())
                .build();

        Optional<Review> SavedReview = Optional.of(reviewRepository.save(review));


        int averageStarByTrainerId = reviewRepository.findAverageStarByTrainerId(createReviewRequest.getTargetId());


        UpdateStarRequest updateStarRequest = new UpdateStarRequest(createReviewRequest.getTargetId(), averageStarByTrainerId);

        // DTO를 JSON으로 변환
        String json = gson.toJson(updateStarRequest);


        // RequestBody에 JSON 탑재
        RequestBody body = RequestBody.create(json, JSON);

//        Request request;

        Request request = new Request.Builder()
                .url(sendAverageStar)
                .post(body)
                .build();

        // request 요청
        try (Response response = client.newCall(request).execute()) {
            // 요청 실패
            if (!response.isSuccessful()){
                throw new ServerCommunicationException();
            }else{

                ReviewDto reviewDto = new ReviewDto(SavedReview);

                return reviewDto;
            }
        }

    }

    public Optional<GetReviewResponse> getReview(Long id) {

        Review review = reviewRepository.findById(id).orElseThrow(() -> new ReviewNotFoundException(id));

        Optional<GetReviewResponse> getReviewResponse = Optional.of(new GetReviewResponse(review));

        return getReviewResponse;
    }


    public void delete(DeleteReviewRequest deleteReviewRequest) {
        Optional<Review> review = reviewRepository.findById(deleteReviewRequest.getId());

        reviewRepository.delete(review.get());
    }
}
