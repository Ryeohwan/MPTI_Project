package mpti.domain.reservation.dao;

import lombok.RequiredArgsConstructor;
import mpti.domain.reservation.entity.Reservation;
//import mpti.domain.business.entity.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ReservationRepository {

    private final EntityManager em;

    public List<Reservation> findAll(){
        return em.createQuery("select r from Reservation r", Reservation.class)
                .getResultList();
    }

    public List<Reservation> findAllByTrainerAndDate(Long trainerId, int year, int month, int day) {
        return em.createQuery("select r from Reservation r " +
                        "where r.trainerId = :trainerId and r.year = :year and r.month = :month and r.day = :day")
                .setParameter("trainerId", trainerId)
                .setParameter("year", year)
                .setParameter("month", month)
                .setParameter("day", day)
                .getResultList();
    }

    public Reservation findOne(Long id){
        return em.find(Reservation.class, id);
    }

    public void delete(Reservation reservation) {
        em.remove(reservation);
    }

    public void saveSchedule(Reservation reservation) {
        em.persist(reservation);
    }



}
