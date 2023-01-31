package mpti.domain.member.dao;

import mpti.domain.member.entity.Ptlog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PtlogRepository extends JpaRepository<Ptlog,Long> {
    @Override
    <S extends Ptlog> S save(S entity);


}
