package mpti.domain.opinion.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QOpinion is a Querydsl query type for Opinion
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QOpinion extends EntityPathBase<Opinion> {

    private static final long serialVersionUID = -1916100457L;

    public static final QOpinion opinion = new QOpinion("opinion");

    public final DateTimePath<java.time.LocalDateTime> createdAt = createDateTime("createdAt", java.time.LocalDateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath memo = createString("memo");

    public final NumberPath<Long> targetId = createNumber("targetId", Long.class);

    public final StringPath targetName = createString("targetName");

    public final NumberPath<Long> writerId = createNumber("writerId", Long.class);

    public final StringPath writerName = createString("writerName");

    public QOpinion(String variable) {
        super(Opinion.class, forVariable(variable));
    }

    public QOpinion(Path<? extends Opinion> path) {
        super(path.getType(), path.getMetadata());
    }

    public QOpinion(PathMetadata metadata) {
        super(Opinion.class, metadata);
    }

}

