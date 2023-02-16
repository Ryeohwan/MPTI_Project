package mpti.domain.opinion.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReview is a Querydsl query type for Review
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReview extends EntityPathBase<Review> {

    private static final long serialVersionUID = -1371171933L;

    public static final QReview review = new QReview("review");

    public final QOpinion _super = new QOpinion(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final StringPath memo = _super.memo;

    public final NumberPath<Integer> star = createNumber("star", Integer.class);

    //inherited
    public final NumberPath<Long> targetId = _super.targetId;

    //inherited
    public final StringPath targetName = _super.targetName;

    //inherited
    public final NumberPath<Long> writerId = _super.writerId;

    //inherited
    public final StringPath writerName = _super.writerName;

    public QReview(String variable) {
        super(Review.class, forVariable(variable));
    }

    public QReview(Path<? extends Review> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReview(PathMetadata metadata) {
        super(Review.class, metadata);
    }

}

