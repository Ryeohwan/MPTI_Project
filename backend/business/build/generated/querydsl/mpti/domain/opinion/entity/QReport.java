package mpti.domain.opinion.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QReport is a Querydsl query type for Report
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QReport extends EntityPathBase<Report> {

    private static final long serialVersionUID = -1371344513L;

    public static final QReport report = new QReport("report");

    public final QOpinion _super = new QOpinion(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    //inherited
    public final NumberPath<Long> id = _super.id;

    //inherited
    public final StringPath memo = _super.memo;

    public final StringPath reportType = createString("reportType");

    public final DateTimePath<java.time.LocalDateTime> stopUntil = createDateTime("stopUntil", java.time.LocalDateTime.class);

    //inherited
    public final NumberPath<Long> targetId = _super.targetId;

    //inherited
    public final StringPath targetName = _super.targetName;

    public final EnumPath<Role> targetRole = createEnum("targetRole", Role.class);

    //inherited
    public final NumberPath<Long> writerId = _super.writerId;

    //inherited
    public final StringPath writerName = _super.writerName;

    public QReport(String variable) {
        super(Report.class, forVariable(variable));
    }

    public QReport(Path<? extends Report> path) {
        super(path.getType(), path.getMetadata());
    }

    public QReport(PathMetadata metadata) {
        super(Report.class, metadata);
    }

}

